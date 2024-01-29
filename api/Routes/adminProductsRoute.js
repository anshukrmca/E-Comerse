import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { createMultipleProducts, createProducts, deleteProducts, updateProducts } from '../controllers/productsController';

const router = express.Router();

router.post("/",verifyToken,createProducts);
router.post("/creates",verifyToken,createMultipleProducts);
router.delete("/:id",verifyToken,deleteProducts);
router.put("/:id",verifyToken,updateProducts);