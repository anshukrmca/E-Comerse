import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { findProductByIds, gettAllProducts } from '../controllers/productsController.js';

const router = express.Router();

router.post("/",verifyToken,gettAllProducts);
router.put("/id/:id",verifyToken,findProductByIds);


export default router;