import CartItem from "../models/cartItemModel";
import { findUserById } from "./userService";

export const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error("cart item not found", cartItemId);
    }
    const user = await findUserById(item.userId);
    if (!user) {
      throw new Error("user not found", item.userId);
    }

    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updateCartItem = await item.save();
      return updateCartItem;
    } else {
      throw new Error("you can not update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeCartItem = async (userId, cartItemId) => {
  try {
    const cartItem = await findCartItemById(cartItemId);
    const user = await findUserById(userId);

    if (user._id.toString() === cartItem.userId.toString()) {
      await CartItem.findByIdAndDelete(cartItemId);
    }
    throw new Error("you cart remove another uoser's item");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findCartItemById = async (cartItemId) => {
  try {
    //  const cartItem = await CartItem.findById(cartItemId);
    const cartItem = await findCartItemById(cartItemId);
    if (cartItem) {
      return cartItem;
    } else {
      throw new Error("cartitem not found with id ", cartItemId);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
