import express from 'express'
import {createOrderAndProduct,getAllOrdersForUser} from '../controller/order.controller.js'
import requireAuthenticationMiddleware from '../middleware/requireAuthenticationMiddleware.js'
import authz from '../middleware/authz.js'
const router = express.Router()

router.post('/orders',[requireAuthenticationMiddleware,authz(['user.order'])],createOrderAndProduct)
router.get('/orders',[requireAuthenticationMiddleware],getAllOrdersForUser)

export default router