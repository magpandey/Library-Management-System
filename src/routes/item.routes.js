import { createItem,getItems } from "../controllers/item.controller.js";
import isStaffAuthenticated from "../middlewares/auth.middleware.js";

import express from 'express'

const router = express.Router()

router.route('/').post(isStaffAuthenticated,createItem);
router.route('/').get(isStaffAuthenticated,getItems)

export default router