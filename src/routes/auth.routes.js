import {registerStaff,loginStaff} from '../controllers/auth.controller.js';
import express from 'express';


const router = express.Router()

router.route('/register').post(registerStaff);

router.route('/login').post(loginStaff);

export default router;