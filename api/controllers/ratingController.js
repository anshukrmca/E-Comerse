import { createRating, getProductRating } from "../service/ratingService";

export const createRatings = async (req, res, next) => {
  const user = req.user;
  try {
    const review = await createRating(req.body, user);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

export const getProductRatings = async (req, res, next) => {
  const user = req.user;
  const productId = req.params.productId;
  try {
    const review = await getProductRating(productId);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};
