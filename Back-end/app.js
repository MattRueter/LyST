import express from "express";
import cors from"cors";
import morgan from "morgan";
import getTodosRouter from "./Routes/get_todos_route.js";
import addTodosRouter from "./Routes/add_todos_route.js";
import deleteTodosRouter from"./Routes/delete_todos_route.js";
import updateTodosRouter from"./Routes/update_todos_route.js";
import todos  from "./data/todos.js";

const app = express();
const PORT = 5000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));


//Routes
app.use("/gettodos", getTodosRouter);
app.use("/addtodo", addTodosRouter);
app.use("/deletetodo", deleteTodosRouter);
app.use("/updatetodo", updateTodosRouter);
app.get("/", (req,res) => {
    res.send("TODO back-end up and running.")
});
app.get("/todos", (req,res) => {
    res.json(todos)
});



app.listen(PORT,() =>{
    console.log(`Vite-React Todo server listening on ${PORT}`)
});