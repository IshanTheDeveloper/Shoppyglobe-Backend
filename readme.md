# ShoppyGlobe E-commerce Backend API

This repository contains the backend for the ShoppyGlobe e-commerce application, built using Node.js, Express, and MongoDB.

## Project Objective

The objective of this project is to provide API endpoints to support the functionalities of an e-commerce platform, including product management, cart operations, user authentication, and more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Setup Instructions](#setup-instructions)
- [Testing](#testing)
- [Screenshots](#screenshots)
- [Error Handling and Validation](#error-handling-and-validation)
- [Authentication and Authorization](#authentication-and-authorization)
- [Submission Guidelines](#submission-guidelines)

## Features

- Product listing and details retrieval
- Shopping cart management
- User registration and login
- JWT-based authentication
- Error handling and data validation

## Technologies Used

- **Node.js** for the server environment
- **Express.js** for building APIs
- **MongoDB** as the database
- **JWT** for authentication
- **ThunderClient** for API testing

## API Endpoints

### Product Routes

- **GET /products:** Fetch a list of products.
- **GET /products/:id:** Fetch details of a single product by its ID.

### Cart Routes

- **POST /cart:** Add a product to the shopping cart.
- **PUT /cart/:id:** Update the quantity of a product in the cart.
- **DELETE /cart/:id:** Remove a product from the cart.

### User Routes

- **POST /register:** Register a new user.
- **POST /login:** Authenticate user and return a JWT token.

## Setup Instructions

1. Clone this repository.
2. Navigate to the project directory:
   ```bash
   cd shoppyglobe-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. The API will be running on `http://localhost:3000`

6. Configure MongoDB by connecting to a local instance or a cloud-based service. Example MongoDB connection string in the code:
   ```bash
   mongodb://localhost:27017
   ```

## Testing

- All routes have been tested using **ThunderClient**.
- Import the ThunderClient collection from the `/tests` directory for quick testing.

## Screenshots

Include screenshots of MongoDB database collections and successful API responses.

## Error Handling and Validation

- Comprehensive error handling implemented for all API routes.
- Input validation checks for product existence before adding to the cart.

## Authentication and Authorization

- JWT-based authentication implemented.
- Protected routes for cart operations to allow only logged-in users.
- User passwords are securely stored.

## Submission Guidelines

- Ensure the API runs without errors.
- Submit a GitHub link with code and documentation, including API testing screenshots.
- Include code comments and documentation.

## License

This project is licensed under the MIT License.
