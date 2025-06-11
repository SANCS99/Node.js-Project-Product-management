const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');


router.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Create new product
router.post('/', ProductController.createProduct);

//  Get all products
router.get('/', ProductController.getAllProducts);

// Get product by ID
router.get('/:id', ProductController.getProductById);

//  Update product
router.put('/:id', ProductController.updateProduct);

// Delete product
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
