import {createOrder,getAllOrders} from '../service/order.service.js'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient({ log: ['query', 'info'] })


export const createOrderAndProduct= async (req,res)=>{
    const {userId, products} = req.body
    const zodBody = z.object({
        userId: z.number(),
        products: z.array(z.object({
            productId: z.number(),
            quantity: z.number()
        }))
    })
    const validatedBody = ()=>{
        try{
            return zodBody.parse(req.body)
        }catch(error){
            res.status(404).json({})
        }
    }
    const orderProduct = await createOrder(userId,products)
    res.status(200).json({data: orderProduct})
}

export const getAllOrdersForUser= async (req,res)=>{
    const userId = req.user.userId
    const {startAt, endAt} = req.query
    const orders = await getAllOrders(userId,startAt,endAt)
    const ordersFomated= orders.map((e)=>{
        return {
            id: e.id,
            totalPrice: e.totalPrice,
            products: e.orderProduct.map((e1)=>{
                return { 
                    id: e1.productId,
                    price: e1.productPrice,
                    quantity: e1.productQuantity
                }
            })
        }
    })
    res.status(200).json({data: ordersFomated})
}