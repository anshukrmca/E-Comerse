import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItem",
      },
    ],
    orderDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    deleveryDate: {
      type: Date,
    },
    shippingAddess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresse",
    },
    paymentDetails: {
      paymentMethod: {
        type: String,
      },
      TransectionId: {
        type: String,
      },
      PaymentID: {
        type: String,
      },
      PaymentStatus: {
        type: String,
        default: "PENDING",
      },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalDiscountPrice: {
      type: Number,
      required: true,
    },
    discounts: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "PENDING",
    },
    totalItem: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
