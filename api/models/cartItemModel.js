import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"products ",
        required:true
    },
    size:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    discountsPrice:{
        type:Number,
        required:true,
        default:0
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
  },
  { timestamps: true }
);

const CartItem = mongoose.model("cartItem", cartItemSchema);

export default CartItem;
