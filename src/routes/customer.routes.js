import { createCustomer,getCustomer } from "../controllers/customer.controller.js";

import express from 'express'
import isStaffAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router()

router.route('/').post(isStaffAuthenticated,createCustomer)

router.route('/').get(isStaffAuthenticated,getCustomer)

export default router