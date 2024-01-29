import express from 'express';
import { removeCartItems, updateCartItems } from '../controllers/cartItemController';
import { verifyToken } from '../utils/verifyUser';

const router = express.Router();

router.put("/:id",verifyToken,updateCartItems);
router.delete("/:id",verifyToken,removeCartItems);