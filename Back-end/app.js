const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const getTodosRouter = require("./Routes/get_books_route");
const { todos } = require("./data/todos");

const app = express();
const PORT = 5000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));


//Routes
app.use("/gettodos", getTodosRouter);
app.get("/", (req,res) => {
    res.send("TODO back-end up and running.")
});
app.get("/todos", (req,res) => {
    res.json(todos)
});



app.listen(PORT,() =>{
    console.log(`Vite-React Todo server listening on ${PORT}`)
});