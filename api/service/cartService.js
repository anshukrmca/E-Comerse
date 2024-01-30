import Cart from "../models/cartModel.js";
import CartItem from "../models/cartItemModel.js";
import Product from "../models/productsModel.js";

export const createCart = async (user) => {
  try {
    const cart = new Cart({ user });
    const createCart = await cart.save();
    return createCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findUserCart = async (userId) => {
  try {
    let cart = await Cart.findOne({ user: userId });
    let cartItem = await CartItem.find({ cart: cart._id }).populate("product");
    cart.cartItem = cartItem;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let cartItem of cart.cartItem) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountsPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.totalDiscountedPrice = totalDiscountedPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addItemToCart = async (userId, req) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(req.ProductId);


    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });

    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        size: req.size,
        discountsPrice: product.discountedPrice,
      });


      const createdCartItem = await cartItem.save();

      cart.cartItem.push(createdCartItem);
      await cart.save();
      return "Item Added to Cart";
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
