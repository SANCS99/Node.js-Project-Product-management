const ProductModel = require('../models/productModel');

class ProductController {
  static async createProduct(req, res) {
    try {
      const { name, price, quantity } = req.body;
      
      if (!name || !price || !quantity) {
        return res.status(400).json({ 
          error: "Missing required fields",
          required: ["name", "price", "quantity"]
        });
      }

      const results = await ProductModel.create({ name, price, quantity });
      res.status(201).json({
        message: 'Product registered successfully',
        product: {
          id: results.insertId,
          name,
          price,
          quantity,
          created_at: new Date()
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await ProductModel.findAll();
      res.json({
        total_products: products.length,
        products
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${req.params.id} not found` });
      }
      res.json({
        message: `Product details for ID: ${req.params.id}`,
        product
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { name, price, quantity } = req.body;
      
      if (!name || !price || !quantity) {
        return res.status(400).json({ 
          error: "Missing required fields",
          required: ["name", "price", "quantity"]
        });
      }

      const results = await ProductModel.update(req.params.id, { name, price, quantity });
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json({
        message: 'Product successfully updated',
        product: {
          id: parseInt(req.params.id),
          name,
          price,
          quantity
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const results = await ProductModel.delete(req.params.id);
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
