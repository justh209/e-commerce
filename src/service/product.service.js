import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ log: ['query', 'info'] })

export const showProductOfService = async (name)=>{
    console.log(name,"ERT")
    const product = await prisma.product.findMany({
        ...(name ? {where:{
            name: {
                contains: name}
        }} : {}),
        select:{
            name: true,
            price: true
        },
        orderBy:{
            name:'asc',
        }
    })
    return product
}

export const showProductByIdOfService = async (id)=>{
    const product = await prisma.product.findUnique({
        where:{
            id: Number(id)
        },
        select:{
            name: true,
            price: true
        }
    })
    return product
}

export const addProductOfService = async (name,price)=>{
    const newProduct = await prisma.product.create({
        data:{
            name: name,
            price: price
        }
    })
    return newProduct
}

export const updateProductOfService = async (id,name,price)=>{
    const updatedProduct = await prisma.product.update({
        where:{
            id: Number(id)
        },
        data:{
            name: name,
            price: price
        }
    })
    return updatedProduct
}

export const deleteProductOfService = async (id)=>{
    const deletedProduct = await prisma.product.delete({
        where:{
            id: Number(id)
        }
    })
    return deletedProduct
}