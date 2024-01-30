import express from 'express';
import { removeCartItems, updateCartItems } from '../controllers/cartItemController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.put("/:id",verifyToken,updateCartItems);
router.delete("/:id",verifyToken,removeCartItems);

export default router;