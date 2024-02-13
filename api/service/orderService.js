import Addresse from "../models/addressModel.js";
import OrderItem from "../models/orderItemModel.js";
import Order from "../models/orderModel.js";
import { findUserCart } from "./cartService.js";

export const createOrder = async (userId, resDate) => {
    try {

        const cart = await findUserCart(userId);
        const orderItems = [];
        for (const item of cart.cartItem) {
            const orderItem = new OrderItem({
                price: item.price,
                product: item.product,
                quantity: item.quantity,
                size: item.size,
                userId: item.userId,
                discountedprice: item.discountsPrice
            })

            const createdOrderItem = await orderItem.save();

            orderItems.push(createdOrderItem);
        }

        const createOrder = new Order({
            UserId: cart.user,
            orderItem: orderItems,
            totalPrice: cart.totalPrice,
            totalDiscountPrice: cart.totalDiscountedPrice,
            discounts: cart.discounts,
            totalItem: cart.totalItem,
            shippingAddess: resDate.shippingAddess,
            paymentDetails: {
                paymentMethod: resDate.paymentMethod
            }
        })
        const saverOrders = await createOrder.save();
        const saveOrder = await saverOrders.populate('UserId');
        return await saveOrder.populate('shippingAddess');
    } catch (error) {
        throw new Error(error.message)
    }
}


export const UpdateOrderStatus = async (reqData) => {
   const {orderId,orderstatus} = reqData;
    const order = await findOrderById(orderId);
    order.orderStatus = orderstatus;
    if (orderstatus === "DELIVERED") {
        order.paymentDetails.PaymentStatus = "COMPLETED";
    }else{
        order.paymentDetails.PaymentStatus = "PENDING";
    }

    return await order.save();
}

export const placeOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "PLACED";
    order.paymentDetails.status = "CPMPLETED";

    return await order.save();
}

export const confirmedOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "COMFIRMED";

    return await order.save();
}

export const shipOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "SHIPPED";

    return await order.save();
}


export const deliverOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "DELEVIRED";

    return await order.save();
}

export const cancleOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "CANCELLED";

    return await order.save();
}

export const findOrderById = async (orderId) => {
    console.log(orderId)
    const order = await Order.findById(orderId)
        .populate("UserId")
        .populate({ path: "orderItem", populate: { path: "product" } })
        .populate("shippingAddess")

    return order;
}

export const UsersOrderHistory = async (UserId) => {
    try {

        const orders = await Order.find({ UserId: UserId, orderStatus: "PLACED" })
            .populate({ path: "orderItem", populate: { path: "product" } })
            .populate('shippingAddess')
            .lean();
        return orders;

    } catch (error) {
        console.error('Error fetching user order history:', error.message);
        throw new Error(error.message);
    }
}

export const getAllOrder = async () => {
    return await Order.find()
        .populate({ path: "orderItem", populate: { path: "product" } })
        .populate('shippingAddess')
        .populate('UserId').lean()
}

export const deleteOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}