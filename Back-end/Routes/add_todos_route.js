import express from "express";
import todos from "../data/todos.js";

const addTodosRouter = express.Router();

addTodosRouter.post("/:newtodo", (req,res,) =>{
    let newTodo = JSON.parse(req.params.newtodo);
    newTodo.id = todos[todos.length-1].id+1
    todos.push(newTodo)

    res.send(newTodo)
});


export default addTodosRouter;
