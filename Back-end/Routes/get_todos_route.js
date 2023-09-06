const express = require("express");
const {todos} = require("../data/todos");
const getTodosRouter =express.Router();


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

getTodosRouter.get("/:userid/bystatus", (req, res) => {
    const user = req.params.userid;
    let isFinished = req.query.isfinished;
    isFinished === 'true' ? isFinished = true :isFinished = false;
    
    //below will be replaced by fetching to DB
    const todoList = todos.filter((item) => item.owner === user && item.finished === isFinished); 
    
    res.json(todoList)
});

module.exports = getTodosRouter;