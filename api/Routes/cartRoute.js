import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addItemCart, findUserCarts } from '../controllers/cartController.js';

const router = express.Router();

router.get("/",verifyToken,findUserCarts);
router.post("/add",verifyToken,addItemCart);

export default router;