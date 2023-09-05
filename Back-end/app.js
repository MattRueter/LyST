const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { todos } = require("./data/todos");

const app = express();
const PORT = 5000;

//Middleware
app.use(cors());
app.use(morgan("tiny"));

//Routes
app.get("/", (req,res) => {
    res.send("TODO back-end up and running.")
});
app.get("/todos", (req,res) => {
    res.json(todos)
});


app.listen(PORT,() =>{
    console.log(`Vite-React Todo server listening on ${PORT}`)
});