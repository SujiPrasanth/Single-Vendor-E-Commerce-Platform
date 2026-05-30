# Single Vendor E-Commerce Platform

A full-stack e-commerce web application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). This platform is designed for a single store owner who can manage and sell products across multiple categories such as electronics, mobiles, clothing, travel accessories, and more through a centralized online store.

The application provides secure user authentication, product management, cart functionality, online payment processing, and order management. It includes a dedicated admin dashboard that allows the store owner to manage products, monitor orders, and update delivery statuses.

---

## Overview

This project simulates a real-world e-commerce platform where a single vendor manages all products and customer orders. Users can browse products, add items to their cart, make secure payments, and track their orders. The admin has complete control over inventory and order processing.

The application follows RESTful API architecture and implements secure authentication using JWT, bcrypt password hashing, and cookies-based session management.

---

## Features

### User Features
- User Registration and Login
- Secure Authentication using JWT
- Password Hashing using bcrypt
- Cookies-Based Session Management
- Browse Products by Categories
- View Product Details
- Add Products to Cart
- Update Cart Items
- Remove Products from Cart
- Secure Checkout Process
- Online Payments using Razorpay
- Order Placement and Tracking

### Admin Features
- Admin Dashboard
- Add New Products
- Update Product Information
- Delete Products
- Upload Product Images using Multer
- Manage Customer Orders
- Verify Payments
- Update Order Status
  - Pending
  - Dispatched
  - Delivered

### Security Features
- JWT Authentication
- bcrypt Password Hashing
- Protected Routes
- Role-Based Access Control
- Secure Cookie Handling

---

## Technologies Used

### Frontend
- React.js
- Tailwind CSS
- React Router


### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JWT (JSON Web Tokens)
- bcrypt
- Cookies

### Payment Gateway
- Razorpay

### File Upload
- Multer

---

## REST API Operations

The application follows RESTful API architecture and supports:

- GET Requests
- POST Requests
- PUT Requests
- PATCH Requests
- DELETE Requests

CRUD operations are implemented for:

- Users
- Products
- Cart
- Orders

---

## Project Workflow

### User Workflow

1. User registers an account.
2. Password is encrypted using bcrypt before storing in the database.
3. User logs in and receives a JWT token.
4. Authentication data is managed using secure cookies.
5. User browses products from multiple categories.
6. User adds products to the cart.
7. User proceeds to checkout.
8. Payment is processed through Razorpay.
9. Order is created after successful payment verification.

### Admin Workflow

1. Admin logs into the dashboard.
2. Admin adds new products.
3. Product images are uploaded using Multer.
4. Admin updates or removes products.
5. Admin manages incoming orders.
6. Admin updates order statuses:
   - Pending
   - Dispatched
   - Delivered

---


## Installation

### Clone Repository

```bash
git clone https://github.com/SujiPrasanth/Single-Vendor-E-Commerce-Platform.git
```

### Navigate to Project Folder

```bash
cd single-vendor-ecommerce-platform
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

RAZORPAY_KEY_ID=your_razorpay_key_id

RAZORPAY_SECRET=your_razorpay_secret

```

---

## Key Learning Outcomes

This project helped in understanding:

- Full-Stack MERN Development
- REST API Design
- Authentication and Authorization
- JWT Token Management
- Password Encryption using bcrypt
- Cookies-Based Session Handling
- MongoDB Database Design
- File Upload Handling using Multer
- Payment Gateway Integration
- Order Management Systems
- Admin Dashboard Development
- Responsive UI Development with Tailwind CSS

---

## Future Enhancements

- Wishlist Functionality
- Product Reviews and Ratings
- Search and Filtering
- Inventory Management
- Sales Analytics Dashboard
- Email Notifications
- Product Recommendations

---

## Author

**Suji Prasanth**

Full Stack Developer | MERN Stack Enthusiast