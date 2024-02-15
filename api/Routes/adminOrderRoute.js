import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { cancleOrders, deleteOrders, getAllOrders, updateOrderStatus } from '../controllers/adminOrderController.js';
import { getDashboardInfo } from '../controllers/DashBoardController.js';

const router = express.Router();

router.get("/",verifyToken,getAllOrders);
router.put("/",verifyToken,updateOrderStatus)
router.put("/:orderId/cancel",verifyToken,cancleOrders)
router.delete("/:orderId",verifyToken,deleteOrders)
router.get('/dashboardData', verifyToken, getDashboardInfo);

export default router;

