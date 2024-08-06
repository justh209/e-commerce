import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ log: ['query', 'info'] })

export const createOrder = async (userId, products) => {
    return prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
            data: {
                userId: userId,
                totalPrice: 0,
            }
        })
        const id = []
        for (let i = 0; i < products.length; i++) {
            console.log(products[i])
            id.push(products[i].productId)
        }
        const productDict = await tx.product.findMany({
            where: {
                id: { in: id }
            },
            select: {
                id: true,
                price: true
            }
        })
        const productPayload = products.map((e) => {
            const targetProduct = productDict.find((e1) => {
                return e1.id === e.productId
            })
            const productPrice = targetProduct.price
            const product = {
                orderId: order.id,
                productId: e.productId,
                productPrice: productPrice,
                productQuantity: e.quantity,
            }
            return product
        })
        const totalPrice = productPayload.reduce((acc, e) => {
            return acc + (e.productPrice * e.productQuantity)
        }, 0)
        const updatedOrder = await tx.order.update({
            where: { id: order.id },
            data: {
                totalPrice: totalPrice,
            }
        })
        const orderProduct = await tx.orderProduct.createMany({
            data: productPayload,
        })

        return updatedOrder;
    })
}

export const getAllOrders = async (userId,startAt,endAt)=>{
    const allOrders= await prisma.order.findMany({
        where:{userId: userId,
        ...(startAt ? {createdAt:{gte: new Date(startAt)}}:{}),
        ...(endAt ? {createdAt:{lte: new Date(endAt)}}:{})
        },
        select:{
            id: true,
            totalPrice: true,
            orderProduct:{
                select:{
                    productId: true,
                    productQuantity: true,
                    productPrice: true,
                }
            }
        }
    })
    return allOrders;
}
