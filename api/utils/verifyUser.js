import { getUserIdFromToken } from "./JwtProvide.js";
import { findUserById } from "../service/userService.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      res.status(404).json({ error: "You are not authenticated !" });
    }
    const userId = await getUserIdFromToken(token);
    const user = await findUserById(userId);
    // res.user = user;
  } catch (error) {
    next(error);
  }
  next();
}; 
