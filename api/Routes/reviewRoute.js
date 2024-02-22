import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { checkReview, createReviews, getAllReviews } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/create', verifyToken,createReviews);
router.get('/:id', verifyToken,checkReview);
router.get('/product/:id', verifyToken,getAllReviews);

export default router;