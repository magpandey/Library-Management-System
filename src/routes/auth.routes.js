import {registerStaff} from '../controllers/auth.controller.js';
import express from 'express';


const router = express.Router()

router.route('/register').post(registerStaff);



export default router;