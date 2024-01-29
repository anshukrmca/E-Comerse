import {addItemToCart, findUserCart} from '../service/cartService.js'

export const findUserCarts = async(req,res,next)=>{
    const user = req.user;
    try {
        const cart = await findUserCart(user._id);
        res.status(200).json(cart);
    } catch (error) {
        next(error)
    }
}

export const addItemCart = async(req,res,next)=>{
    const user = req.user;
    try {
        const cartItem = await addItemToCart(user._id,req.body)
        res.status(200).json(cartItem);
    } catch (error) {
        next(error)
    }
}