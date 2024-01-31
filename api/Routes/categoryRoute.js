import express from 'express';
import { createCategory, getSecondLevelCategory, getThirdLevelCategory, getTopLevelCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/topLevelCategory', getTopLevelCategory);
router.get('/secondLevelCategory', getSecondLevelCategory);
router.get('/thirdLevelCategory', getThirdLevelCategory);
router.post("/",createCategory)

export default router;