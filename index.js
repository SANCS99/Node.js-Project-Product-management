const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('\nAvailable API Endpoints:');
  console.log('\nUser Routes:');
  console.log('  POST   /api/users/register    - Register new user');
  console.log('  POST   /api/users/login       - Login user');
  console.log('  GET    /api/users            - Get all users');
  console.log('  GET    /api/users/:id        - Get user by ID');
  
  console.log('\nProduct Routes:');
  console.log('  POST   /api/products         - Create new product');
  console.log('  GET    /api/products         - Get all products');
  console.log('  GET    /api/products/:id     - Get product by ID');
  console.log('  PUT    /api/products/:id     - Update product');
  console.log('  DELETE /api/products/:id     - Delete product\n');
});
