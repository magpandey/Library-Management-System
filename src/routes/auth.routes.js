import {registerStaff,loginStaff,logoutStaff} from '../controllers/auth.controller.js';
import isStaffAuthenticated from '../middlewares/auth.middleware.js';
import express from 'express';


const router = express.Router()

router.route('/register').post(registerStaff);

router.route('/login').post(loginStaff);

router.route('/logout').post(isStaffAuthenticated,logoutStaff)
export default router;