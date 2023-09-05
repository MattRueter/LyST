import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (thunkApi) => {
        const result = await fetch("http://localhost:5000/todos");
        const data = await result.json();
        return data;        
    }
)

const initialState = {
    todos:[{todo:"add a todo"}]
}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo( state, action){
            state.push(action.payload);
        },
    },
    extraReducers: {
        [fetchTodos.fulfilled] : (state,action) =>{
            state.todos = action.payload
        }
    }
});

export const { addTodo,  } = todoSlice.actions;

