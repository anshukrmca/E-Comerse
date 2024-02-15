import Order from "../models/orderModel.js";
import Product from "../models/productsModel.js";
import User from "../models/userModel.js";


export const getDashBoardData = async () => {
    try {
        // Total Orders
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();

        // Total Earnings
        const totalEarningsResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalDiscountPrice' }
                }
            }
        ]);
        const totalEarnings = totalEarningsResult.length > 0 ? totalEarningsResult[0].total : 0;
        const data = [
            { total: totalOrders, title: "Order" },
            { total: totalEarnings, title: "Earning" },
            { total: totalProducts, title: "Product" },
            { total: totalUsers, title: "User" }
        ];

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
