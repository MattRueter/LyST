import express from "express";
import db from "../data/conn.js";

const getTodosRouter = express.Router();
const currentUser = "64ff27036484f5406876fbe9";
const currentCollection = "todos";


getTodosRouter.get("/", async (req,res) => {
    const user = currentUser;
    const query = { owner : user};
    
    const collection = await db.collection(currentCollection);
    const todoList = await collection.find(query).toArray();
   
    res.json(todoList);
});

getTodosRouter.get("/bydate/:date", async (req, res) => {
    const user = currentUser;
    const date = req.params.date;
    const query = { owner:user, due:date }
    
    const collection = await db.collection(currentCollection);
    const todoList = await collection.find(query).toArray();
    
    res.json(todoList)
});

getTodosRouter.get("/byproject/:project", async (req, res) => {
    const user = currentUser;
    const project = req.params.project;
    const query = { owner : user, projects : project }

    const collection = await db.collection(currentCollection);
    const todoList = await collection.find(query).toArray();
    
    res.json(todoList)
});

getTodosRouter.get("/bypriority/:priority", async (req, res) => {
    const user = currentUser;
    const priority = req.params.priority;
    const query = { owner : user, priority:priority };

    const collection = await db.collection(currentCollection);
    const todoList = await collection.find(query).toArray();

    res.json(todoList)
});

getTodosRouter.get("/bystatus/:isfinished", async (req, res) => {
    const user = currentUser;
    let isFinished = req.params.isfinished;
    isFinished === 'true' ? isFinished = true :isFinished = false;
    const query = { owner : user, finished : isFinished }
    
    const collection = await db.collection(currentCollection);
    const todoList = await collection.find(query).toArray();
    
    res.json(todoList)
});

export default getTodosRouter;