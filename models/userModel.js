const db = require('../config/db');

class UserModel {
  static async create(user) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (username, password, email, mobile, first_name, last_name, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [user.username, user.password, user.email, user.mobile, user.first_name, user.last_name, user.address],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static findByCredential(field, value) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE ?? = ?', [field, value], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, username, email, mobile, first_name, last_name, address FROM users WHERE id = ?', 
        [id], 
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, username, email, mobile, first_name, last_name FROM users', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = UserModel;
