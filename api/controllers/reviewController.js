import Product from "../models/productsModel.js";
import { findProductById } from "../service/productService.js";
import { checkReviewProduct, createReview, getAllReview } from "../service/reviewService.js";
import { getUserIdFromToken } from "../utils/JwtProvide.js";

export const createReviews = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
  const userId = await getUserIdFromToken(token);
  try {
    const review = await createReview(req.body, userId);
    await Product.findByIdAndUpdate(
      review.product,
      {
        $push: { reviews: review._id },
      },
      { new: true }
    );
    res.status(200).json({message:"Review Added !"});
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const review = await getAllReview(productId);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};
