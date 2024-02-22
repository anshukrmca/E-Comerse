import Reviews from "../models/reviewsModel.js";
import { findProductById } from "./productService.js"


export const createReview = async(reqData,user)=>{
    const product = await findProductById(reqData.product);
    const review = new Reviews({
        user:user,
        product:product._id,
        review:reqData.review,
        rating:reqData.rating
    })
    return await review.save();
} 

export const getAllReview =async(productId)=>{
    const product = await findProductById(productId);
    return await Reviews.find({product:productId}).populate("user");
}

export const checkReviewProduct = async (userId, productId) => {
    try {
      const matchingReview = await Reviews.findOne({ product: productId, user: userId });
      return !!matchingReview; // Return true if a matching review is found, false otherwise
    } catch (error) {
      console.error("Error in checkReviewProduct:", error);
      throw error;
    }
  };