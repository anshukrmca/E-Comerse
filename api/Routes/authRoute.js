import express from 'express';
import { signin, signup } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
// router.post('/profileByToken', getUserProfileByToken);
// router.get('/signout', signout);

export default router;