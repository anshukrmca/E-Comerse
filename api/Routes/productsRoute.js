import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { findProductByIds, gettAllProducts, gettallProductByCatergory } from '../controllers/productsController.js';

const router = express.Router();

router.get("/",gettAllProducts);
router.get("/category",gettallProductByCatergory);
router.get("/id/:id",verifyToken,findProductByIds);


export default router;