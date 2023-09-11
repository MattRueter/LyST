import express from "express";
import { ObjectId } from "mongodb";
import db from "../data/conn.js";

const deleteTodosRouter = express.Router();
const currentCollection = "todos";

deleteTodosRouter.delete("/:todoId", async (req,res)=>{
    const id = req.params.todoId;
    const query = {_id : new ObjectId(id) };

    const collection = await db.collection(currentCollection);
    const deletedTodo = await collection.deleteOne(query);
 
    res.json(deletedTodo);
});

export default deleteTodosRouter;