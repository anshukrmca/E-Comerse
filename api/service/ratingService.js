import Ratings from "../models/ratingsModel.js";
import { findProductById } from "./productService.js";

export const createRating = async (req, user) => {
  const product = await findProductById(req.productId);

  const rating = new Ratings({
    product: product._id,
    user: user._id,
    rating: req.rating,
  });
  return await rating.save();
};

export const getProductRating = async (productId) => {
  return await Ratings.find({ product: productId });
};
