import express from "express";
import db from "../data/conn.js";
const getTodosRouter = express.Router();
const currentCollection = "todos";


getTodosRouter.post("/", async (req,res) => {
   const userid = req.body._id;
   const query = { owner : userid };

   const collection = await db.collection(currentCollection);
   const todoList = await collection.find(query).toArray();

   res.json(todoList);
});

getTodosRouter.post("/bydate/:date", async (req, res) => {
    const userid = req.body._id;
    const date = req.params.date;
    const query = { owner:userid, due:date }
    
    const collection = await db.collection(currentCollection);
    const todoList = await collection.find(query).toArray();
    
    res.json(todoList)
});

getTodosRouter.post("/byproject/:project", async (req, res) => {
    const userid = req.body._id;
    const project = req.params.project;
    const query = { owner : userid, projects : project }

    const collection = await db.collection(currentCollection);
    const todoList = await collection.find(query).toArray();
    
    res.json(todoList)
});

getTodosRouter.post("/bypriority/:priority", async (req, res) => {
    const userid = req.body._id;
    const priority = req.params.priority;
    const query = { owner : userid, priority:priority };

    const collection = await db.collection(currentCollection);
    const todoList = await collection.find(query).toArray();

    res.json(todoList)
});

getTodosRouter.post("/bystatus/:isfinished", async (req, res) => {
    const userid = req.body._id;
    let isFinished = req.params.isfinished;
    isFinished === 'true' ? isFinished = true :isFinished = false;
    const query = { owner : userid, finished : isFinished }
    
    const collection = await db.collection(currentCollection);
    const todoList = await collection.find(query).toArray();
    
    res.json(todoList)
});

export default getTodosRouter;