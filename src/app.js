import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import itemRoutes from './routes/item.routes.js'
import customerRoutes from './routes/customer.routes.js'
dotenv.config({
    path: "./.env"
});
const app = express();

app.use(express.json({limit: '16mb'}));
app.use(express.urlencoded({limit: '16mb', extended: true}));
app.use(cookieParser());

//routes
app.get('/', (req, res) => {
    res.send('Library Management System API is running');
});
app.use('/api/auth',authRoutes);
app.use('/api/items',itemRoutes)
app.use('/api/customers',customerRoutes)

export default app;