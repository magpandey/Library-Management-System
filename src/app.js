import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
dotenv.config({
    path: "./.env"
});
const app = express();

app.use(express.json({limit: '16mb'}));
app.use(express.urlencoded({limit: '16mb', extended: true}));


//routes
app.get('/', (req, res) => {
    res.send('Library Management System API is running');
});
app.use('/api/auth',authRoutes);



export default app;