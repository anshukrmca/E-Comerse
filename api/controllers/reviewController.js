import { createReview, getAllReview } from "../service/reviewService.js";
import { getUserIdFromToken } from "../utils/JwtProvide.js";

export const createReviews = async (req, res, next) => {
  const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
    const userId = await getUserIdFromToken(token);
  try {
    const review = await createReview(req.body, userId);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
  const userId = await getUserIdFromToken(token);
  const productId = req.params.productId;
  try {
    const review = await getAllReview(productId);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};
