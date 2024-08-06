import express from 'express'
import {showProduct,showProductById,addProduct,updateProduct,deleteProduct} from '../controller/product.controller.js'
import requireAuthenticationMiddleware from '../middleware/requireAuthenticationMiddleware.js'
import authz from '../middleware/authz.js'
const router = express.Router()

router.get('/product',showProduct)
router.get('/product/:id',showProductById)
router.post('/product',[requireAuthenticationMiddleware,authz(['admin.product.create'])],addProduct)
router.put('/product/:id',[requireAuthenticationMiddleware,authz(['admin.product.update'])],updateProduct)
router.delete('/product/:id',[requireAuthenticationMiddleware,authz(['admin.product.delete'])],deleteProduct)

export default router