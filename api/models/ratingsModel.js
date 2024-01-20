import mongoose from "mongoose";

const RatingsSchema = new mongoose.Schema(
  {
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
    ratings: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Ratings = mongoose.model("ratings", RatingsSchema);

export default Ratings;
