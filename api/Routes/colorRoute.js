import express from 'express';
import { createColor, getAllColor } from '../controllers/colorController.js';

const router = express.Router();

router.post('/new-color', createColor);
router.get('/', getAllColor);

export default router;