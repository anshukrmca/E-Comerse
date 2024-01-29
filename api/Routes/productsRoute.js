import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { findProductByIds, gettAllProducts } from '../controllers/productsController';

const router = express.Router();

router.post("/",verifyToken,gettAllProducts);
router.put("/id/:id",verifyToken,findProductByIds);