import { createRating, getProductRating } from "../service/ratingService.js";

export const createRatings = async (req, res, next) => {
  const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
    const userId = await getUserIdFromToken(token);
  try {
    const review = await createRating(req.body, userId);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

export const getProductRatings = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
  const userId = await getUserIdFromToken(token);
  const productId = req.params.productId;
  try {
    const review = await getProductRating(productId);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};
