import express from "express";
import todos from"../data/todos.js";

const  updateTodosRouter = express.Router();

updateTodosRouter.put("/:userid/:todoid", (req,res) =>{
    const id = Number(req.params.todoid);
    const userid = req.params.userid ;
    let updatedTodos;
    //replace with DB query 
    for(let i=0; i<todos.length; i++){
        if(todos[i].id === id && todos[i].owner === userid){
            //update
            todos[i].finished === true? todos[i].finished=false :todos[i].finished = true;
        }
    }
     updatedTodos = todos.filter((todo) =>todo.owner===userid);
    res.json(updatedTodos)
});

export default updateTodosRouter;