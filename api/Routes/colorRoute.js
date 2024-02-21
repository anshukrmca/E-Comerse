import express from 'express';
import { UpdateColor, createColor, deleteColor, getAllColor, getColorbyId} from '../controllers/colorController.js';

const router = express.Router();

router.post('/new-color', createColor);
router.get('/', getAllColor);
router.delete('/:id', deleteColor);
router.get('/:id', getColorbyId);
router.put('/:id', UpdateColor);

export default router;