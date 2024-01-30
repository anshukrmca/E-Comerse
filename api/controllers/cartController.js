import { addItemToCart, findUserCart } from '../service/cartService.js'
import { getUserIdFromToken } from '../utils/JwtProvide.js';

export const findUserCarts = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "You are not authenticated!" });
        }
        const userId = await getUserIdFromToken(token);
        const cart = await findUserCart(userId);
        res.status(200).json(cart);
    } catch (error) {
        next(error)
    }
}

export const addItemCart = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "You are not authenticated!" });
        }
        const userId = await getUserIdFromToken(token);
        const cartItem = await addItemToCart(userId, req.body)
        res.status(200).json(cartItem);
    } catch (error) {
        next(error)
    }
}