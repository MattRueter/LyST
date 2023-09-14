import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    todos:[],
    loading: null,
    failed: false,
    success:false,
    newTodoName:"",
}

export const fetchTodosByUserid = createAsyncThunk(
    'todos/fetchTodosByUserid',
    async ( currentUser,thunkAPI) => {
        
        currentUser =JSON.stringify(currentUser)
        
        const result = await fetch(`http://localhost:5000/gettodos/`,{
        method: "POST",
        headers:{
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
        let {todo, priority, due, projects, owner} = newtodo 
        const newTodoJson = JSON.stringify({todo,priority,due,projects,owner});
        const result = await fetch(`http://localhost:5000/addtodo/${newTodoJson}`, {
            method:"POST",
            headers:{
                "Content-type" : "application/json"
            },
            body: JSON.stringify(secret)
        });
        return newtodo
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
    },
    extraReducers: {
        [fetchTodosByUserid.fulfilled] : (state,action) =>{
            state.loading = false
            state.success = true
            state.todos = action.payload
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
            console.log("waiting to add to db before updating UI.")
        },
        [postNewTodo.fulfilled] : (state, action) =>{
            const newtodo = action.payload
            state.newTodoName = newtodo.todo
        },
        [postNewTodo.rejected] : (state, action) =>{
            console.log("rejected. Check error handling.")
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
            console.log(`marked item as complete or incomplete.`)
        }
    }
});

export const {filterTodos, markFinishedUI, deleteUI} = todosSlice.actions