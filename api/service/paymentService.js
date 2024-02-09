import { razorpay } from "../utils/razorpayClient.js";
import { findOrderById } from "./orderService.js"
import crypto from 'crypto';



export const createPayment = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    const timestamp = Date.now();
    const receipt = `${orderId}_${timestamp}`;
    if (!order) {
      throw new Error(`Order not found for orderId: ${orderId}`);
    }
    const options = {
      amount: Number(order.totalDiscountPrice * 100),
      currency: "INR",
      receipt: receipt,
    };
    const order_Payment = await razorpay.orders.create(options);
    return order_Payment
  } catch (error) {
    throw new Error(error.message);
  }
};


export const paymentVerify = async (resData) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = resData;

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.APISECRET)
      .update(sign.toString())
      .digest("hex");
    if (razorpay_signature === expectedSign) {
      const resData = {paymentId: razorpay_payment_id, success: true }
      return resData;
    } else {
      const resData = { message: "Invalid signature sent !", success: true }
      return resData;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}



export const updatePaymentInformation = async (resData) => {
  const paymentID = resData.paymentID;
  const ProductorderID = resData.ProductorderID;
  console.log(resData);
  try {
    const order = await findOrderById(ProductorderID);
    const payment = await razorpay.payments.fetch(paymentID);
    if (payment.status == "captured") {
      order.paymentDetails.PaymentID = payment.id;
      order.paymentDetails.TransectionId= payment.order_id,
      order.paymentDetails.PaymentStatus = "COMPLETED";
      order.orderStatus = "PLACED";
      await order.save();
    }
    const resData = {order, message: "Your Order is placed", success: true }
    return resData;
  } catch (error) {
    throw new Error(error.message)
  }
};