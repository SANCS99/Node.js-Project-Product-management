const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserController {
  static async register(req, res) {
    try {
      const { username, password, email, mobile, first_name, last_name, address } = req.body;
      
      // Validation
      if (!username || username.length < 3) {
        return res.status(400).json({ error: "Username must be at least 3 characters" });
      }
      if (!password || password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: "Valid email is required" });
      }
      if (!mobile || !/^\d{10}$/.test(mobile)) {
        return res.status(400).json({ error: "Valid 10-digit mobile number is required" });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const results = await UserModel.create({
        username, 
        password: hashedPassword,
        email,
        mobile,
        first_name,
        last_name,
        address
      });

      res.status(201).json({
        message: "User registered successfully",
        userId: results.insertId,
        username,
        email,
        mobile
      });

    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.sqlMessage.includes('username')) {
          return res.status(409).json({ error: "Username already exists" });
        }
        if (error.sqlMessage.includes('email')) {
          return res.status(409).json({ error: "Email already registered" });
        }
        if (error.sqlMessage.includes('mobile')) {
          return res.status(409).json({ error: "Mobile number already registered" });
        }
      }
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { login, password } = req.body;
      
      // Validation
      const user = await UserModel.findByCredential('username', login) || 
                   await UserModel.findByCredential('email', login) ||
                   await UserModel.findByCredential('mobile', login);

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        }
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUser(req, res) {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json({ 
        total_users: users.length,
        users 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
