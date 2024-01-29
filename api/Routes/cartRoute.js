import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { addItemCart, findUserCarts } from '../controllers/cartController';

const router = express.Router();

router.get("/",verifyToken,findUserCarts);
router.put("/add",verifyToken,addItemCart);