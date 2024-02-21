import express from 'express';
import { createCategory, getSecondLevelCategory, getThirdLevelCategory, getTopLevelCategory, updataCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/topLevelCategory', getTopLevelCategory);
router.get('/secondLevelCategory', getSecondLevelCategory);
router.get('/thirdLevelCategory', getThirdLevelCategory);
router.post("/",createCategory)
router.put("/",updataCategory)

export default router;