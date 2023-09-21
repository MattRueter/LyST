import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProjectsList } from "../../Utils/utilities";
import { APIKEY } from "../../../secrets";

const initialState = {
    todos:[],
    loading: null,
    failed: false,
    success:false,
    newTodoName:"",
    projects: [],
}

export const fetchTodosByUserid = createAsyncThunk(
    'todos/fetchTodosByUserid',
    async ( currentUser,thunkAPI) => {
        
        currentUser =JSON.stringify(currentUser)
        
        const result = await fetch(`http://localhost:5000/gettodos/`,{
        method: "POST",
        headers:{
            "Authorization": APIKEY,
            "Content-type": "application/json"
        },
        body: currentUser
        });
        
        const data = await result.json();
        return data;        
    }
)

export const fetchTodosByCriteria = createAsyncThunk(
    'todos/fetchTodosByCriteria',
    async(criteria, thunkAPI) => {
        const currentUser =JSON.stringify(criteria.currentUser)
        const result = await fetch(`http://localhost:5000/gettodos/${criteria.route}/${criteria.criteria}`,{
            method: "POST",
            headers:{
                "Authorization": APIKEY,
                "Content-type": "application/json"
            },
            body: currentUser
        });
        const data = await result.json();
        return data;
    }
)
export const postNewTodo = createAsyncThunk(
    'todos/postNewTodo',
    async(newtodo,thunkAPI) => {
        const secret = {secret : newtodo.secret};
        let {todo, priority, due, projects, owner, finished} = newtodo 
        const newTodoJson = JSON.stringify({todo,priority,due,projects,owner, finished});
        const result = await fetch(`http://localhost:5000/addtodo/${newTodoJson}`, {
            method:"POST",
            headers:{
                "Authorization": APIKEY,
                "Content-type" : "application/json"
            },
            body: JSON.stringify(secret)
        });
        let data = await result.json()
        data.newTodo=newtodo.todo
        return data;
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async(data, thunkAPI) => {
        const {id} =data;
        let secret ={secret : data.secret};
        secret = JSON.stringify(secret);

        const result = await fetch(`http://localhost:5000/deletetodo/${id}`, {
            method:"DELETE",
            headers:{
                "Authorization": APIKEY,
                "Content-type": "application/json"
            },
            body: secret
        });
        
 
        return id; //returns id from click event this is used to update state in the same action below. 
    }
)

export const markTodoFinished = createAsyncThunk(
    'todos/markFinished',
    async(data, thunkAPI) => {
        const {id} = data;
        const {status} = data;
        let secret ={secret : data.secret};
        secret = JSON.stringify(secret);
  
        const result = await fetch(`http://localhost:5000/updatetodo/${id}/${status}`, {
            method:"PUT",
            headers:{
                "Authorization": APIKEY,
                "Content-type": "application/json"
            },
            body: secret
        });
        const returnedData = await result.json();

        return returnedData;
    }
);
export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers:{
        markFinishedUI: (state, action) => {
            const id = action.payload.id; 
            let status = action.payload.status;
            status === true ? status = false : status = true;
            
            const stateCopy = state.todos.map((item) =>item);
            const index = stateCopy.findIndex((item) => item._id === id);
            stateCopy[index].finished = status;

            state.todos = stateCopy;
        },
        deleteUI: (state, action) => {
            const id = action.payload;
            const newList = state.todos.filter((item) =>item._id !== id);
            state.todos = newList;
        },
        addProject: (state,action) => {
            state.projects.push(action.payload)
        },
        clearNewTodo: (state,action) =>{
            state.newTodoName =""
        }
    },
    extraReducers: {
        [fetchTodosByUserid.fulfilled] : (state,action) =>{
            state.loading = false
            state.success = true
            state.todos = action.payload
            state.projects = getProjectsList(action.payload);
        },
        [fetchTodosByUserid.pending] : (state,action) =>{
            state.loading = true
        },
        [fetchTodosByUserid.rejected] : (state,action) =>{
            state.failed = true
        },        
        [fetchTodosByCriteria.fulfilled] : ( state, action) =>{
            state.loading = false
            state.success = true
            state.todos = action.payload
        },
        [postNewTodo.pending] : (state, action) =>{
            console.log("Adding new todo to DB. UI will update separately.")
        },
        [postNewTodo.fulfilled] : (state, action) =>{
            const { newTodo } = action.payload
            state.newTodoName = newTodo
            
        },
        [postNewTodo.rejected] : (state, action) =>{
            console.log("rejected. Check error handling in postNewTodo action.")
            state.newTodoName = false
        },
        [fetchTodosByCriteria.pending] : (state,action) => {
            state.loading = true
        },
        [fetchTodosByCriteria.rejected] : (state,action) => {
            state.failed = true
        },
        [deleteTodo.fulfilled] : (state,action) =>{            
            const id = action.payload;
            const newList = state.todos.filter((item) =>item.id !== id);
            state.todos = newList;
     
        },
        [markTodoFinished.pending] :(state, action) => {
            console.log(`item being updated`)
        },
        [markTodoFinished.rejected] :(state, action) => {
            console.log(`rejected`)
        },
        [markTodoFinished.fulfilled] :(state, action) => {
 
        }
    }
});

export const {markFinishedUI, deleteUI, addProject, clearNewTodo} = todosSlice.actions