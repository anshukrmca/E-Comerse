import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import cartReducer from './features/cartSlice';
import orderReducer from './features/orderSlice';
import ordersReducer from './features/adminOrderSlice';
import productReducer from './features/productSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    orders: ordersReducer,
    product:productReducer
  },
});
