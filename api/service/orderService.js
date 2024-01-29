import Addresse from "../models/addressModel";
import Order from "../models/orderModel";
import { findUserCart } from "./cartService";

export const createOrder =async(user,shippAddress)=>{
    try {
        let address;
        if(shippAddress._id){
            let existAddress = await Addresse.findById(shippAddress._id);
            address = existAddress;
        }else{
            address = new Addresse(shippAddress);
            address.user= user;
            await address.save();
            user.addresses.push(address);
            await user.save();
        }

        const cart = await findUserCart(user._id);
        const orderItem=[];
        for(const item of cart.cartItem){
            const orderItem = new orderItem({
                price:item.price,
                product:item.product,
                quantity:item.quantity,
                size:item.size,
                userId:item.userId,
                discountedPrice:item.discountedPrice
            })

            const createdOrderItem = await orderItem.save();
            orderItem.push(createdOrderItem);
        }

        const createOrder = new Order({
            user,
            orderItem,
            totalPrice:cart.totalPrice,
            totalDiscountPrice:cart.totalDiscountedPrice,
            discounts:cart.discounts,
            totalItem:cart.totalItem,
            shippingAddess:address
        })

        const saverOrder= await createOrder.save()
        return saverOrder
    } catch (error) {
        throw new Error(error.message)
    }
}

export const placeOrder = async(orderId)=>{
    const order = await findOrderById(orderId);
    order.orderStatus = "PLACED";
    order.paymentDetails.status="CPMPLETED";

    return await order.save();
}

export const confirmedOrder = async(orderId)=>{
    const order = await findOrderById(orderId);
    order.orderStatus = "COMFIRMED";

    return await order.save();
}

export const shipOrder = async(orderId)=>{
    const order = await findOrderById(orderId);
    order.orderStatus = "SHIPPED";

    return await order.save();
}


export const deliverOrder = async(orderId)=>{
    const order = await findOrderById(orderId);
    order.orderStatus = "DELEVIRED";

    return await order.save();
}

export const cancleOrder = async(orderId)=>{
    const order = await findOrderById(orderId);
    order.orderStatus = "CANCELLED";

    return await order.save();
}

export const findOrderById = async(orderId)=>{
    const order = await Order.findById(orderId)
    .populate("user")
    .populate({path:"orderItem",populate:{path:"product"}})
    .populate("shippingAddess")

    return order;
}

export const UsersOrderHistory = async(userId)=>{
    try {
        const orders = await Order.find({user:userId,orderStatus:"PLACED"})
        .populate({path:"orderItem",populate:{path:"product"}}).lean()

        return orders;

    } catch (error) {
     throw new Error(error.message)   
    }
}

export const getAllOrder = async()=>{
return await Order.find()
.populate({path:"orderItem",populate:{path:"product"}}).lean()
}

export const deleteOrder = async(orderId)=>{
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);

}