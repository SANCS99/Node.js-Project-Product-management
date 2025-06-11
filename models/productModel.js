const db = require('../config/db');

class ProductModel {
  static create(product) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)',
        [product.name, product.price, product.quantity],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM products', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static update(id, product) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?',
        [product.name, product.price, product.quantity, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = ProductModel;
