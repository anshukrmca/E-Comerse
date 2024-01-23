import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema(
  {
    review: {
    type: String,
    required: true,
  },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("reviews", ReviewsSchema);

export default Reviews;
