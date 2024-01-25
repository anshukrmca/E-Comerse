import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from '../api/Routes/userRoute.js';
import authRoutes from '../api/routes/authRoute.js';
import productRoutes from '../api/Routes/productRoute.js'
import addressRoute from '../api/Routes/addressRoute.js'
import colorRoute from '../api/Routes/colorRoute.js'
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

const mongoURI = process.env.MONGO;

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const app = express();

// const __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

app.use(express.json());

app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/address', addressRoute);
app.use('/api/color', colorRoute);

app.use((err, req, res, next) => {  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});