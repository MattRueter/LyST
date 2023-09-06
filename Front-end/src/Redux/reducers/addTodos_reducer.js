import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState ={
    todo:"",
}

export const postNewTodo = createAsyncThunk(
    'add Todos/postNewTodo',
    async(newtodo,thunkAPI) => {
        const newTodoJson = JSON.stringify(newtodo)
        const result = await fetch(`http://localhost:5000/addtodo/${newTodoJson}`, {method:"POST"});
        const data = await result.json();
        return data
    }
);

export const addTodosSlice = createSlice({
    name: 'add Todos',
    initialState,
    reducers:{
        addTodo : (state,action)=>{
            const newTodo = action.payload;
            state.todo = action.payload.todo
        }
    },
    extraReducers :{
        [postNewTodo.fulfilled] : (state, action) =>{
            state.todo = action.payload.todo
        },
    }
})

export const { addTodo } = addTodosSlice.actions;