import express from 'express';
import {
  updateUser,
  deleteUser,
  getAllUser,
  getUserDetails4admin,
} from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken,getAllUser);
router.get('/:id', verifyToken,getUserDetails4admin);
// router.post('/update/:id', verifyToken, updateUser);
// router.delete('/delete/:id', verifyToken, deleteUser);

export default router;