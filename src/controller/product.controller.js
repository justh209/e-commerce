import {showProductOfService,showProductByIdOfService,addProductOfService,updateProductOfService,deleteProductOfService} from '../service/product.service.js'
import { z } from 'zod'

export const showProduct = async (req, res) => {
    const name=req.query.name
    const products = await showProductOfService(name)
    res.status(200).json({data:products})
}

export const showProductById = async (req, res) => {
    const { id } = req.params
    const product = await showProductByIdOfService(id)
    if (!product) {
        return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json({data: product})
}

export const addProduct = async (req, res) => {
    const { name, price } = req.body
    const zodBody = z.object({
        name: z.string(),
        price: z.number()
    })
    try{
        const parsed= zodBody.parse(req.body)
    }
    catch(error){
        return res.status(400).json({ error: error })
        return
    }
    if (!name ||!price) {
        return res.status(400).json({ error: 'Missing name or price' })
    }
    const newProduct = await addProductOfService(name, price)
    res.status(201).json({data: newProduct})
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, price } = req.body
    if (!name ||!price) {
        return res.status(400).json({ error: 'Missing name or price' })
    }
    const updatedProduct= await updateProductOfService(id, name, price)
    if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json({data: updatedProduct})
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    const deletedProduct = await deleteProductOfService(id)
    if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json({message: 'Product deleted successfully'})
}