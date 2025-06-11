# Node.js Product Management API

A RESTful API built with Node.js, Express, and MySQL for managing products and users in an e-commerce system.

## Features

- User Management
  - User registration with validation
  - User authentication (login)
  - Get user details
  - List all users
  - Secure password hashing using bcrypt

- Product Management
  - Create new products
  - List all products
  - Get product details
  - Update product information
  - Delete products

## Tech Stack

- Node.js
- Express.js
- MySQL
- bcrypt for password hashing
- Body Parser for request parsing



## Setup Instructions

1. Clone the repository
2. Install dependencies:
```sh
npm install
```

3. Configure MySQL database:
   - Create a database named 'assignment'
   - Import the schema from `assignment.sql`
   - Update database credentials in `config/db.js` if needed

4. Start the server:
```sh
npm start
```

The server will start on port 3000.

