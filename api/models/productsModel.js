import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    discountedPresentage: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    color: {
      type: Array,
      required: true,
    },
    size: {
      type: Array,
      required: true,
  },
    mainImage: {
      type: String,
      required: true,
    },
    SubImage: [
      {
        type: String,
        required: true,
      }
    ],
    ratings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
    reviews: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
    numRating: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    brand: {
      type: String,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", productSchema);

export default Product;
