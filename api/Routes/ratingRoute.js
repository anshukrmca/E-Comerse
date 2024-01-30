import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createRatings, getProductRatings } from '../controllers/ratingController.js';

const router = express.Router();

router.post('/create', verifyToken,createRatings);
router.get('/product/:productId', verifyToken,getProductRatings);

export default router;