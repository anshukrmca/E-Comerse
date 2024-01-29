import {
  UsersOrderHistory,
  createOrder,
  findOrderById,
} from "../service/orderService";

export const createOrders = async (req, res, next) => {
  const user = req.user;
  try {
    const createdOrder = await createOrder(user, req.body);
    res.status(200).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

export const findOrderByIds = async (req, res, next) => {
  const user = req.user;
  try {
    const createdOrder = await findOrderById(req.params.id);
    res.status(200).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

export const UsersOrderHistorys = async (req, res, next) => {
  const user = req.user;
  try {
    const historyOrder = await UsersOrderHistory(user._id);
    res.status(200).json(historyOrder);
  } catch (error) {
    next(error);
  }
};
