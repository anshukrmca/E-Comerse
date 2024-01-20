import express from 'express';
import { getuserProfile, signin, signout, signup } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile',getuserProfile);
router.get('/signout', signout);

export default router;