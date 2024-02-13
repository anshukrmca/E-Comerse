import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { cancleOrders, deleteOrders, deliverOrders, getAllOrders, shipOrders, updateOrderStatus } from '../controllers/adminOrderController.js';

const router = express.Router();

router.get("/",verifyToken,getAllOrders);
router.put("/",verifyToken,updateOrderStatus)
router.put("/:orderId/deliver",verifyToken,deliverOrders)
// router.put("/:orderId/confirmed",verifyToken,confirmedOrders)
router.put("/:orderId/cancel",verifyToken,cancleOrders)
router.put("/:orderId/delete",verifyToken,deleteOrders)

export default router;

