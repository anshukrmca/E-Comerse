import { UpdateOrderStatus, cancleOrder, confirmedOrder, deleteOrder, deliverOrder, getAllOrder, shipOrder } from "../service/orderService.js";


export const getAllOrders = async(req,res,next)=>{
    try {
        const orders =await getAllOrder();
        res.status(200).json(orders);
    } catch (error) {
       next(error); 
    }
}

export const updateOrderStatus = async(req,res,next)=>{
    try {
        const orders = await UpdateOrderStatus(req.body);
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error('Error updating order status:', error.message);
        next(error);
    }
}

export const shipOrders = async(req,res,next)=>{
    const orderId = req.params.orderId;
    try {
        const orders =await shipOrder(orderId);
        res.status(200).json(orders);
    } catch (error) {
       next(error); 
    }
}

export const deliverOrders = async(req,res,next)=>{
    const orderId = req.params.orderId;
    try {
        const orders =await deliverOrder(orderId);
        res.status(200).json(orders);
    } catch (error) {
       next(error); 
    }
}

export const cancleOrders = async(req,res,next)=>{
    const orderId = req.params.orderId;
    try {
        const orders =await cancleOrder(orderId);
        res.status(200).json(orders);
    } catch (error) {
       next(error); 
    }
}


export const deleteOrders = async(req,res,next)=>{
    const orderId = req.params.orderId;
    try {
        const orders =await deleteOrder(orderId);
        res.status(200).json(orders);
    } catch (error) {
       next(error); 
    }
}