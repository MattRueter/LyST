import express from "express";
import session from "express-session";
import passport from "passport";
import cors from"cors";
import morgan from "morgan";
import "./loadEnvironment.js";
import { checkSecret, checkApikey } from "./utils/authentication_utils.js";
import loginRouter from "./Routes/login_route.js";
import getTodosRouter from "./Routes/get_todos_route.js";
import addTodosRouter from "./Routes/add_todos_route.js";
import deleteTodosRouter from"./Routes/delete_todos_route.js";
import updateTodosRouter from"./Routes/update_todos_route.js";


const app = express();
const PORT =  process.env.PORT;
const SECRET = process.env.SECRET;
const store = new session.MemoryStore();


//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//SESSION-------------------------------------------------------------------
app.use(
    session({
        secret : SECRET,
        resave : false,
        saveUninitialized : false,
        store,
    })
)
//PASSPORT MOUNTING---------------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use("/login", loginRouter);
//once authorized...
app.use(checkSecret)
app.use(checkApikey);
app.use("/gettodos", getTodosRouter);
app.use("/addtodo", addTodosRouter);
app.use("/deletetodo", deleteTodosRouter);
app.use("/updatetodo", updateTodosRouter);
app.get("/", (req,res) => {
    res.send("TODO back-end up and running.")
});

app.listen(PORT,() =>{
    console.log(`Vite-React Todo server listening on ${PORT}`)
});