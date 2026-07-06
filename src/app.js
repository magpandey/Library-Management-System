import express from 'express';
import dotenv from 'dotenv';
dotenv.config({
    path: "./.env"
});
const app = express();

app.use(express.json({limit: '16mb'}));
app.use(express.urlencoded({limit: '16mb', extended: true}));



export default app;