import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState ={
    todo:null,
    todoName:""
}

export const postNewTodo = createAsyncThunk(
    'add Todos/postNewTodo',
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

export const addTodosSlice = createSlice({
    name: 'add Todos',
    initialState,
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