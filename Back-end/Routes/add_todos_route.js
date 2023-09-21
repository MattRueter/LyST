import express from "express";
import db from "../data/conn.js";

const addTodosRouter = express.Router();
const currentCollection = "todos";

addTodosRouter.post("/:newTodo", async (req,res) => {
    let newTodo = JSON.parse(req.params.newTodo);

    const collection = await db.collection(currentCollection);
    const result = await collection.insertOne(newTodo)
    
    res.json(result)
});

export default addTodosRouter;
