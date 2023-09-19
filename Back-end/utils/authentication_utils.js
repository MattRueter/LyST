import db from "../data/conn.js";
const secret = process.env.SECRET;

//MIDDLEWARE
export const checkSecret = (req, res, next) => {
    if(req.body.secret !== secret){
        console.log("unauthorized attempt")
        res.sendStatus(401);
    }else if(req.body.secret === secret){
        next()
    }else{
        console.log("AT CHECKSECRET () req fell through branches for some reason.");
        next()
    }
};

export const checkIfUserExits = async (req, res, next) =>{
    const userName = req.body.username;
    const collection = await db.collection("users");
    const result = await collection.find({username:userName}).toArray();

    if(result.length >0){
        const msg ={msg: "user exists already"}
        res.json(msg);
    }else{
        next()
    }
};