import bcryptjs from "bcryptjs";
import { gererateToken, getUserIdFromToken } from "../utils/JwtProvide.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../service/userService.js";

export const signup = async (req, res, next) => {
  try {
    await createUser(req.body);
    res.status(200).json({ message: "User successful Created !" });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Wrong credentials" });
    }
    const Jwt = gererateToken(user._id);
    const isAdmin = user.isAdmin
    res.cookie("token", Jwt);
    res.status(200).json({ isAdmin,Jwt,message: "login success" });
  } catch (error) {
    next(error);
  }
};

export const getuserProfile = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
    const userId = await getUserIdFromToken(token);
    const user = await findUserById(userId);
    res.status(200).json({ user, message: "User Profile Get SuccessFull !" });
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie("token").status(200).json({message:"Signout success!"});
};
