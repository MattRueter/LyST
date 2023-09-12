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
    async(todo, thunkAPI) => {
        const result = await fetch(`http://localhost:5000/updatetodo/${todo.id}/${todo.status}`, {method:"PUT"});
        const data = await result.json();
        return data //returns the updated document.
    }
);
export const fetchTodosSlice = createSlice({
    name: "todos",
    initialState,
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
        [markTodoFinished.fulfilled] :(state, action) => {
            const updatedTodo = action.payload
            // copy state.todos.
            const updatedState = state.todos.map((todo) =>todo);
            
            // 1. find updatedTodo in copy of state.todos.
            const index = updatedState.findIndex((item) => item._id === updatedTodo._id);

            // 2. replace previous todo with updated version.
            updatedState.splice( index, 1, updatedTodo );
            
            // 3. make sure state.todos reflects change in UI.
            state.todos = updatedState;
        }
    }
});

export const {filterTodos} = fetchTodosSlice.actions