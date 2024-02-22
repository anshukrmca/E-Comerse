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
    discountedPercentage: {
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
    subImage: [
      {
        type: String,
        required: true,
      }
    ],
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true
    },
    brand: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);

export default Product;
