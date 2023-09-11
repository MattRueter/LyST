import express from "express";
import todos from "../data/todos.js";

const getTodosRouter = express.Router();

getTodosRouter.get("/:userid", (req,res) => {
    const user = req.params.userid;
    //below will be replaced by fetching to DB
    const todoList = todos.filter(item => item.owner === user)
   
    res.json(todoList);
});

getTodosRouter.get("/:userid/bydate/:date", (req, res) => {
    const user = req.params.userid;
    const date = req.params.date;
    //below will be replaced by fetching to DB
    const todoList = todos.filter((item) => item.owner === user && item.due === date); 
    
    res.json(todoList)
});

getTodosRouter.get("/:userid/byproject/:project", (req, res) => {
    const user = req.params.userid;
    const project = req.params.project;
    //below will be replaced by fetching to DB
    const todoList = todos.filter((item) => item.owner === user && item.projects.includes(project)); 
    
    res.json(todoList)
});

getTodosRouter.get("/:userid/bypriority/:priority", (req, res) => {
    const user = req.params.userid;
    const priority = req.params.priority;
    //below will be replaced by fetching to DB
    const todoList = todos.filter((item) => item.owner === user && item.priority === priority); 
    
    res.json(todoList)
});

getTodosRouter.get("/:userid/bystatus/:isfinished", (req, res) => {
    const user = req.params.userid;
    let isFinished = req.params.isfinished;
    //let isFinished = req.query.isfinished;
    isFinished === 'true' ? isFinished = true :isFinished = false;
    
    //below will be replaced by fetching to DB
    const todoList = todos.filter((item) => item.owner === user && item.finished === isFinished); 
    
    res.json(todoList)
});

export default getTodosRouter;