import express from "express";
import { ObjectId } from "mongodb";
import db from "../data/conn.js";

const  updateTodosRouter = express.Router();
const currentCollection = "todos";

updateTodosRouter.put("/:todoid/:todoStatus", async (req,res) =>{
    const id = req.params.todoid;
    let status = req.params.todoStatus;
    status === "true" ? status = false : status = true;
    
    const filter ={ _id : new ObjectId(id) };
    const update = { $set: {finished: status} };
    const options = { new : true, upsert : false};
    
    const collection = await db.collection(currentCollection);
    const updatedTodo = await collection.findOneAndUpdate(filter, update, options)
    
    res.json(updatedTodo)
});

export default updateTodosRouter;