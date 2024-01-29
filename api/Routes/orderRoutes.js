import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { UsersOrderHistorys, createOrders, findOrderByIds } from '../controllers/orderController';

const router = express.Router();

router.post("/",verifyToken,createOrders);
router.get("/user",verifyToken,UsersOrderHistorys);
router.get("/:id",verifyToken,findOrderByIds);