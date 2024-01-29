import { createMultipleProduct, createProduct, deleteProduct, findProductById, gettAllProduct, updateProduct } from "../service/productService"


export const createProducts =async(req,res,next)=>{
    try {
        const product = await createProduct(req,body);
        res.status(200).json(product);
    } catch (error) {
        next(error)
    }
}

export const deleteProducts =async(req,res,next)=>{
    const productId = req.params.id
    try {
        const product = await deleteProduct(productId);
        res.status(200).json(product);
    } catch (error) {
        next(error)
    }
}


export const updateProducts =async(req,res,next)=>{
    const productId = req.params.id
    try {
        const product = await updateProduct(productId,req.body);
        res.status(200).json(product);
    } catch (error) {
        next(error)
    }
}

export const findProductByIds =async(req,res,next)=>{
    const productId = req.params.id
    try {
        const product = await findProductById(productId);
        res.status(200).json(product);
    } catch (error) {
        next(error)
    }
}


export const gettAllProducts =async(req,res,next)=>{
    const productId = req.params.id
    try {
        const product = await gettAllProduct(req.query);
        res.status(200).json(product);
    } catch (error) {
        next(error)
    }
}



export const createMultipleProducts =async(req,res,next)=>{
    try {
        const product = await createMultipleProduct(req.body);
        res.status(200).json({product,message:"All Product add successfull !"});
    } catch (error) {
        next(error)
    }
}