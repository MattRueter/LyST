import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    todos:[{todo:"add a todo"}]
}

export const fetchTodosByUserid = createAsyncThunk(
    'todos/fetchTodosByUserid',
    async ( userid, thunkAPI) => {
        const result = await fetch(`http://localhost:5000/gettodos/${userid}`);
        const data = await result.json();
        return data;        
    }
)

export const fetchTodosByCriteria = createAsyncThunk(
    'todos/fetchTodosByCriteria',
    async(criteria, thunkAPI) => {
        const result = await fetch(`http://localhost:5000/gettodos/${criteria.uid}/${criteria.route}/${criteria.criteria}`);
        const data = await result.json();
        return data;
    }
)

export const fetchTodosSlice = createSlice({
    name: "todos",
    initialState,
    extraReducers: {
        [fetchTodosByUserid.fulfilled] : (state,action) =>{
            state.todos = action.payload
        },
        [fetchTodosByUserid.pending] : (state,action) =>{
            state.todds = [{todo:"loading todos"}]
        },
        [fetchTodosByUserid.rejected] : (state,action) =>{
            state.todos = [{todo:"Failed to load. Check connection"}]
        },
        [fetchTodosByCriteria.fulfilled] : ( state, action) =>{
            state.todos = action.payload
        }
    }
});

export const {filterTodos} = fetchTodosSlice.actions