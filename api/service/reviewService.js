import Reviews from "../models/reviewsModel";
import { findProductById } from "./productService"


export const createReview = async(reqData,user)=>{
    const product = await findProductById(reqData.productId);
    const review = new Reviews({
        user:user._id,
        product:product._id,
        review:reqData.review
    })
    await product.save();
    return await review.save();
} 

export const getAllRevire =async(productId)=>{
    const product = await findProductById(reqData.productId);
    return await Reviews.find({product:productId}).populate("user");
}