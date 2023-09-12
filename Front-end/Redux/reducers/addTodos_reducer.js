import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState ={
    todo:null,
    todoName:""
}

export const postNewTodo = createAsyncThunk(
    'add Todos/postNewTodo',
    async(newtodo,thunkAPI) => {
        const newTodoJson = JSON.stringify(newtodo)
        const result = await fetch(`http://localhost:5000/addtodo/${newTodoJson}`, {method:"POST"});
        const data = await result
        return newtodo
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
        [postNewTodo.pending] : (state, action) =>{
            console.log("waiting to add to db before updating UI.")
        },
        [postNewTodo.fulfilled] : (state, action) =>{
            const newtodo = action.payload
            state.todo = newtodo
            state.todoName = newtodo.todo
        },
        [postNewTodo.rejected] : (state, action) =>{
            console.log("rejected. Check error handling.")
        },
    }
})

export const { addTodo } = addTodosSlice.actions;