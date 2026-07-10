import  {checkoutItem,getLoans,returnItem ,getLoans} from "../controllers/loan.controller.js";

import isStaffAuthenticated from "../middlewares/auth.middleware.js";

import express from 'express'

const router = express.Router()

router.route('/checkout').post(isStaffAuthenticated,checkoutItem)

router.route('/return').post(isStaffAuthenticated,returnItem)

router.route('/').get(isStaffAuthenticated,getLoans)
export default router