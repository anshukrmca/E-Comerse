import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

const mongoURI = process.env.MONGO;

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});



import userRoutes from '../api/Routes/userRoute.js';
app.use('/api/user', userRoutes);

import authRoutes from '../api/routes/authRoute.js';
app.use('/api/auth', authRoutes);


import addressRoute from '../api/Routes/addressRoute.js'
app.use('/api/address', addressRoute);

import colorRoute from '../api/Routes/colorRoute.js'
app.use('/api/color', colorRoute);

import productRoute from '../api/Routes/productsRoute.js'
app.use('/api/product', productRoute);

import AdminproductRoute from '../api/Routes/adminProductsRoute.js'
app.use('/api/admin/product', AdminproductRoute);

import cartRoute from '../api/Routes/cartRoute.js'
app.use('/api/cart', cartRoute);

import cartItemRoute from '../api/Routes/cartItemRoute.js'
app.use('/api/cartItem', cartItemRoute);

import orderRoute from '../api/Routes/orderRoutes.js'
app.use('/api/orders', orderRoute);

import AdminorderRoute from '../api/Routes/adminOrderRoute.js'
app.use('/api/admin/orders', AdminorderRoute);

import reviewRoute from '../api/Routes/reviewRoute.js'
app.use('/api/review', reviewRoute);

import categoryRoute from '../api/Routes/categoryRoute.js'
app.use('/api/category', categoryRoute);

import paymentRoute from '../api/Routes/paymentRoute.js'
app.use('/api/payment', paymentRoute);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});