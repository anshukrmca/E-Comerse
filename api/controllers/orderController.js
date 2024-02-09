import {
  UsersOrderHistory,
  createOrder,
  findOrderById,
} from "../service/orderService.js";
import { getUserIdFromToken } from "../utils/JwtProvide.js";

export const createOrders = async (req, res, next) => {
  const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
    const userId = await getUserIdFromToken(token);
  try {
    const createdOrder = await createOrder(userId, req.body);
    res.status(200).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

export const findOrderByIds = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
    const userId = await getUserIdFromToken(token);
    const createdOrder = await findOrderById(userId);
    res.status(200).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

export const UsersOrderHistorys = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
    const userId = await getUserIdFromToken(token);
    const order = await UsersOrderHistory(userId);
    res.status(200).json({order});
  } catch (error) {
    next(error);
  }
};
