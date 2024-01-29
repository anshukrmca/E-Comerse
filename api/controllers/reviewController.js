import { createReview, getAllReview } from "../service/reviewService";

export const createReviews = async (req, res, next) => {
  const user = req.user;
  try {
    const review = await createReview(req.body, user);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (req, res, next) => {
  const user = req.user;
  const productId = req.params.productId;
  try {
    const review = await getAllReview(productId);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};
