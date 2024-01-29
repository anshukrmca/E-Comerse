import { cancleOrder, confirmedOrder, deleteOrder, deliverOrder, getAllOrder, shipOrder } from "../service/orderService";


export const getAllOrders = async(req,res,next)=>{
    try {
        const orders =await getAllOrder();
        res.status(200).json(orders);
    } catch (error) {
       next(error); 
    }
}

export const confirmedOrders = async(req,res,next)=>{
    const orderId = req.params.orderId;
    try {
        const orders =await confirmedOrder(orderId);
        res.status(200).json(orders);
    } catch (error) {
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