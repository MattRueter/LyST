import express from "express";
import passport  from "passport";
import db from "../data/conn.js";
import { authMethods } from "../auth/auth.js";
import { hashsingMethods } from "../auth/hash.js";
import { checkIfUserExits } from "../utils/authentication_utils.js";

const loginRouter = express.Router();
const { usePassportStrategy } = authMethods;
const { hashPassword } = hashsingMethods;
const secret = process.env.SECRET

//MIDDLEWARE
loginRouter.use(usePassportStrategy);

loginRouter.post("/", 
    passport.authenticate("local", {failureRedirect: "/login"}),
    (req, res) => {
        const user = {
            id: req.session.passport.user.id, 
            username: req.session.passport.user.username,
            secret:secret
        };

        res.json(user)
    }
);

loginRouter.post("/signup", checkIfUserExits, async(req,res) =>{
    const newUserName = req.body.username;
    let newUserPassword = req.body.password;
    //prepar user object for DB insert
    const hashedPassword = await hashPassword(newUserPassword, 10);
    const user = { username:newUserName, password:hashedPassword };
    
    console.log(user)
    //insert into DB
    const collection = await db.collection("users");
    const insertedUser = await collection.insertOne(user);

    //login as part of signup flow
    req.login(user, (err) =>{
        if(err){
            return next(err)
        }
        const loggedinUser ={
            id : user._id,
            username : user.username,
            secret : secret
        }

        res.json(loggedinUser)
    })
}) 

//need to adjust this for front end?
loginRouter.get("/logout", (req,res) =>{
    req.logout(function(err){
        if(err){
            return next(err)
        }
        //need to think about what to send back.
        res.json("logged out.")
    })
})
export default loginRouter