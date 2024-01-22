import Addresse from "../models/addressModel";
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
    } catch (error) {
        throw new Error(error.message)
    }
}