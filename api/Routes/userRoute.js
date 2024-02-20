import express from 'express';
import {
  updateUser,
  deleteUser,
  getAllUser,
} from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken,getAllUser);
// router.post('/update/:id', verifyToken, updateUser);
// router.delete('/delete/:id', verifyToken, deleteUser);

export default router;