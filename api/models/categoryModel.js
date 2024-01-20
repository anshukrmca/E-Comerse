import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("categories", categorySchema);

export default Category;
