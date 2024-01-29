import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { cancleOrders, confirmedOrders, deleteOrders, deliverOrders, getAllOrders, shipOrders } from '../controllers/adminOrderContro;;er';

const router = express.Router();

router.get("/",verifyToken,getAllOrders);
router.put("/:orderId/confirmed",verifyToken,confirmedOrders)
router.put("/:orderId/ship",verifyToken,shipOrders)
router.put("/:orderId/deliver",verifyToken,deliverOrders)
router.put("/:orderId/confirmed",verifyToken,confirmedOrders)
router.put("/:orderId/cancel",verifyToken,cancleOrders)
router.put("/:orderId/delete",verifyToken,deleteOrders)


