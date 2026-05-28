import express from "express";
import cors from "cors";
import axios from "axios";
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const AnilistAPI = process.env.ANILIST_API;


app.use(cors());
app.use(express.json());

const client = createClient({
    url: process.env.REDIS_URL
});
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();


app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.post("/animelist", async (req, res) => {
    const type = req.body.type;
    const animelist = await client.get(type);
    const Query = req.body.query;
    if(animelist){
        res.send(JSON.parse(animelist));
        return;
    }else{
        const respond = await axios.post(AnilistAPI, {
            query:Query
        });
        client.set(type,JSON.stringify(respond.data),{EX:120});
        res.send(respond.data);
    }  
});


app.post("/animeSearch", async (req, res) => {
    const type = req.body.type;
    const animelist = await client.get(type);
    const Query = req.body.query;
    if(animelist){
        res.send(JSON.parse(animelist));
        return;
    }else{
        const respond = await axios.post(AnilistAPI, {
            query:Query
        });
        client.set(type,JSON.stringify(respond.data),{EX:120});
        res.send(respond.data);
    }  
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
