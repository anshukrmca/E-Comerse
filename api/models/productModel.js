import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    size: {
      type: Array,
    },
    color: {
      type: Array,
    },
    price: {
      type: Number,
      required: true
    },
    inStock: {
      type: Boolean,
      default: true
    }
  }, {
  timestamps: true
}
);

const Product = mongoose.model('Product', productSchema);

export default Product;