import { createPayment, paymentVerify, updatePaymentInformation } from "../service/paymentService.js"


export const createpaymentLink = async (req, res, next) => {
    try {
        const paymentDetails = await createPayment(req.body.orderId)
        res.status(200).json({ paymentDetails });
    } catch (error) {
        next(error)
    }
};

export const verifiedPayment = async (req, res, next) => {
    try {
        const paymentVerified = await paymentVerify(req.body)
        res.status(200).json({ paymentVerified });
    } catch (error) {
        next(error)
    }
};

export const updatepaymentInformation = async (req, res, next) => {
    try {
       const orderData = await updatePaymentInformation(req.body)
        res.status(200).json({orderData});
    } catch (error) {
        next(error)
    }
};