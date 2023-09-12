import express from "express";
import db from "../data/conn.js";

const addTodosRouter = express.Router();
const currentUser = "64ff27036484f5406876fbe9";
const currentCollection = "todos";

addTodosRouter.post("/:newTodo", async (req,res) => {
    const user = currentUser;
    let newTodo = JSON.parse(req.params.newTodo);
    newTodo.owner = user;

    const collection = await db.collection(currentCollection);
    const result = await collection.insertOne(newTodo)

    res.json(result)
});

export default addTodosRouter;
