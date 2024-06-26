import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createReviews, getAllReviews } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/create', verifyToken,createReviews);
router.get('/product/:id',getAllReviews);

export default router;