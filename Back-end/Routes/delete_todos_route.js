import express from "express";
import todos from "../data/todos.js";

const deleteTodosRouter = express.Router();

deleteTodosRouter.delete("/:todoId", (req,res)=>{
    const id = Number(req.params.todoId);
    //This will be replaced with DB query to delete an document using document id.
    //IT WON'T RETURN AN ENTIRE COPY OF COLLECTION only the deleted item if we want to use it.
    for(let i=0; i<todos.length; i++){
        if(todos[i].id === id){
            //remove
            const deleted = todos.splice(i,1);
        }
    }
    res.json(todos);
});

export default deleteTodosRouter;