const express = require("express");
const {todos} = require("../data/todos");
const addTodosRouter = express.Router();

addTodosRouter.post("/:newtodo", (req,res,) =>{
    let newTodo = JSON.parse(req.params.newtodo);
    todos.push(newTodo)
    
    res.send(newTodo)
});


module.exports = addTodosRouter;
