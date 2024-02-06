import { removeCartItem, updateCartItem } from "../service/cartItemService.js";
import { getUserIdFromToken } from "../utils/JwtProvide.js";

export const updateCartItems = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
    const userId = await getUserIdFromToken(token);
    await updateCartItem(
      userId,
      req.body
    );
    res.status(200).json({message:"Cart Item is Updated"});
  } catch (error) {
    next(error);
  }
};

export const removeCartItems = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
    const userId = await getUserIdFromToken(token);
    await removeCartItem(userId, req.params.id);
    return res.status(200).json({ message: "Cart Item remove successfull !" });
  } catch (error) {
    next(error);
  }
};
