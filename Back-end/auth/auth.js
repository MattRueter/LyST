import express from "express";
import passport from "passport";
import db from "../data/conn.js";
import { Strategy } from "passport-local";
import { hashsingMethods } from "./hash.js";

const LocalStrategy = Strategy;
const { comparePassword } =hashsingMethods;

//SERIALIZATION
passport.serializeUser((user, done) =>{
    done(null, {id:user._id, username:user.username})
});
passport.deserializeUser((user, done) =>{
    if(user){
        return done(null, user)
    }else{
        return done(err)
    }
});

//STRATEGY
function usePassportStrategy (req,res,next){
    passport.use(
        new LocalStrategy(async function(username, password, cb) {

            //query DB to find user.
            const query ={username:username};
            const collection = await db.collection("users");
            const user = await collection.find(query).toArray();

            //Check to see if user exists.
            if(user.length <= 0){
                return cb(null, false)
            };
            
            //If user exists, compare password to password from client.
 
            const dbPassword = user[0].password;
            const matchFound = await comparePassword(password, dbPassword);
            if(! matchFound){
                return cb(null, false);
            };
            if(matchFound){
                return cb(null, user[0]);
            };
        })
    );
        next()
};

export const authMethods = { usePassportStrategy };