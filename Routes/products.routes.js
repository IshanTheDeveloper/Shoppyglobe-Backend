// Importing product-related controllers to handle product creation
import { createProducts } from "../Controller/products.controller.js";
import { authenticateUser } from "../server.js";
// Importing various functions from the server.js file

import { userRegister } from "../server.js";

import {
  fetchProducts, // Fetch all products
  searchedProduct, // Fetch a specific product by ID
  addItemCart, // Add an item to the cart
  updateCart, // Update an item in the cart
  deleteCartItem, // Delete an item from the cart
} from "../server.js";

// Function to define all API routes
export function routes(app) {
  // ----------- Product Routes -----------

  // GET request to fetch all products from the database
  app.get("/products", fetchProducts);

  // GET request to fetch a specific product by its ID (passed as a URL parameter)
  app.get("/products/:id", searchedProduct);

  // POST request to create a new product and add it to the database
  app.post("/products", createProducts);

  // ----------- Cart Routes -----------

  // POST request to add a product to the cart
  app.post("/cart", authenticateUser, addItemCart);

  // PUT request to update an item in the cart using its ID
  app.put("/cart/:id", authenticateUser, updateCart);

  // DELETE request to remove an item from the cart using its ID
  app.delete("/cart/:id", authenticateUser, deleteCartItem);

  //Register User Router
  app.post("/register", userRegister);
}
