import express from "express";
import passport  from "passport";
import { authMethods } from "../auth/auth.js";

const loginRouter = express.Router();
const { usePassportStrategy } = authMethods;

//MIDDLEWARE
loginRouter.use(usePassportStrategy);

loginRouter.post("/", 
    passport.authenticate("local", {failureRedirect: "/login"}),
    (req, res) => {
        const user = {id: req.session.passport.user.id, username: req.session.passport.user.username};
        res.json(user)
    }
);

export default loginRouter