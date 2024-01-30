import { removeCartItem, updateCartItem } from "../service/cartItemService.js";

export const updateCartItems = async (req, res, next) => {
  const user = req.user;
  try {
    const updatedCartItem = await updateCartItem(
      user._id,
      req.params.id,
      req.body
    );
    res.status(200).json(updatedCartItem);
  } catch (error) {
    next(error);
  }
};

export const removeCartItems = async (req, res, next) => {
  const user = req.user;
  try {
    await removeCartItem(user._id, req.params.id);
    res.status(200).json({ message: "Cart Item remove successfull !" });
  } catch (error) {
    next(error);
  }
};
