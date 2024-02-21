import User from '../models/userModel.js';
import { findUserCart } from '../service/cartService.js';
import { UsersOrderHistory } from '../service/orderService.js';
import { getallUser } from '../service/userService.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';


export const getAllUser = async(req,res,next)=>{
  try {
    const users = await getallUser();
    res.status(200).json({users});
  } catch (error) {
    next(error)
  }
}

// update user

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


// delete user


export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }

}


export const getUserDetails4admin = async (req, res, next) => {
  const userId = req.params.id
  try {
    const user = await User.findById(userId).populate('Useraddress');
    const usercart = await findUserCart(userId);
    const userorder = await UsersOrderHistory(userId);
    res.status(200).json({ user,usercart,userorder });
  } catch (error) {
    next(error);
  }
};
