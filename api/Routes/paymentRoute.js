import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createpaymentLink, updatepaymentInformation, verifiedPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post("/",verifyToken,createpaymentLink);
router.post("/verify",verifyToken,verifiedPayment);
router.post("/update",verifyToken,updatepaymentInformation);

export default router;