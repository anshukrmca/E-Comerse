import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import { gererateToken } from '../utils/JwtProvide.js';
import { createUser, findUserByEmail } from '../service/userService.js';


export const signup = async (req, res, next) => {
  try {
   await createUser(req.body)
   res.status(200).json({message:"User successful Created !"})
  } catch (error) {
    // Handle errors
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email)
    if (!user) return next(errorHandler(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
    const Jwt = gererateToken(user._id)
    res.status(200).json({Jwt,user,message:"login success"})
  } catch (error) {
    next(error);
  }
};



