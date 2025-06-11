const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


router.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// User registration endpoint
router.post('/register', UserController.register);

//User login endpoint
router.get('/login', (req, res) => {
  res.json({ message: 'Login endpoint' });
});

// POST user login
router.post('/login', UserController.login);

// GET all users
router.get('/', UserController.getAllUsers);

// GET user by ID
router.get('/:id', UserController.getUser);

module.exports = router;
