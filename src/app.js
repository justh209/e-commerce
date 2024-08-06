import express from 'express'
import router from './route/auth.route.js'
import productRouter from './route/product.route.js'
import orderRouter from './route/order.route.js'


const app = express()

app.use(express.json())

app.use('/', router)
app.use('/', productRouter)
app.use('/', orderRouter)

export default app