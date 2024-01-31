import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { findProductByIds, gettAllProducts } from '../controllers/productsController.js';

const router = express.Router();

router.get("/",verifyToken,gettAllProducts);
router.get("/id/:id",verifyToken,findProductByIds);


export default router;