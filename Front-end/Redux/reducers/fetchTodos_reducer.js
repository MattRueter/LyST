import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    todos:[],
    loading: null,
    failed: false,
    success:false
}

export const fetchTodosByUserid = createAsyncThunk(
    'todos/fetchTodosByUserid',
    async ( thunkAPI) => {
        const result = await fetch(`http://localhost:5000/gettodos/`);
        const data = await result.json();
        return data;        
    }
)

export const fetchTodosByCriteria = createAsyncThunk(
    'todos/fetchTodosByCriteria',
    async(criteria, thunkAPI) => {
        const result = await fetch(`http://localhost:5000/gettodos/${criteria.route}/${criteria.criteria}`);
        const data = await result.json();
        return data;
    }
)
export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async(id, thunkAPI) => {
        const result = await fetch(`http://localhost:5000/deletetodo/${id}`, {method:"DELETE"});
        const data = await result.json();//returns array of remaining items if that is what we want.
        //return data;
        return id; //returns id from click event this is used to update state in the same action below. 
    }
)

export const markTodoFinished = createAsyncThunk(
    'todos/markFinished',
    async(todoData, thunkAPI) => {
        const result = await fetch(`http://localhost:5000/updatetodo/${todoData.id}/${todoData.status}`, {method:"PUT"});
        const data = await result.json();
        return data;
    }
);
export const fetchTodosSlice = createSlice({
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

export const {filterTodos, markFinishedUI, deleteUI} = fetchTodosSlice.actions