import "../loadEnvironment.js";
import { MongoClient } from "mongodb";

const connectString = process.env.ATLAS_URI;
const client = new MongoClient(connectString);
const database = "Lyst";

let conn;
try{
    conn = await client.connect();
}catch(e){
    console.log(e);
}

let db = conn.db(database);

export default db;
