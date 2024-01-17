import express from 'express';

import { addProduct, updateProduct, deleteProduct, getProduct, getProducts,getProductByCategory } from '../controllers/productController.js';

const router = express.Router();

// POST => /api/products
router.post('/', addProduct);

// PATCH => /api/products/:id
router.patch('/:id', updateProduct);

// DELETE => /api/products/:id
router.delete('/:id', deleteProduct);

// GET => /api/products/:id
router.get('/:id', getProduct);

// GET => /api/products
router.get('/', getProducts);


// GET => /api/products/category/:category
router.get('/category/:category', getProductByCategory);

export default router;