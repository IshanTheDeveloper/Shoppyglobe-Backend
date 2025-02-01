import express from "express"; // Importing express framework
import mongoose from "mongoose"; // Importing mongoose for MongoDB interaction
import { routes } from "./Routes/products.routes.js"; // Importing routes
import productModel from "./Model/products.model.js"; // Importing product model
import cors from "cors"; // Importing CORS for cross-origin requests
import { Cart } from "./Model/products.model.js"; // Importing Cart model
import jwt from "jsonwebtoken"; // Importing JSON Web Token for authentication
const app = new express(); // Creating an express application instance
import { users } from "./Model/products.model.js"; // Importing users model

app.use(cors()); // Enabling CORS
app.use(express.json()); // Parsing JSON request bodies

app.listen(3000, () => {
  // Starting the server on port 3000
  console.log("Server running on port 3000");
});

mongoose.connect("mongodb://localhost:27017"); // Connecting to MongoDB instance
const db = mongoose.connection; // Accessing the database connection object
db.on("open", () => {
  // Listening for successful connection event
  console.log("Database connection successfull....");
});
db.on("error", () => {
  // Handling connection errors
  console.log("Database Connection Error....");
});
routes(app); // Registering routes

// Fetch all products
export async function fetchProducts(req, res) {
  try {
    const products = await productModel.find(); // Fetching all products from the database
    res.status(200).json(products); // Sending success response with products
  } catch (error) {
    res.status(500).json({
      // Handling errors
      message: "Unable to fetch products",
      error: error.message,
    });
  }
}

// Fetch product by ID
export async function searchedProduct(req, res) {
  try {
    const productId = req.params.id; // Extracting product ID from request parameters
    const product = await productModel.findById(productId); // Searching for product by ID
    if (!product) {
      // Handling case when product is not found
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).json(product); // Sending success response with product
  } catch (error) {
    res.status(500).json({
      // Handling errors
      message: "Server Error",
      error: error.message,
    });
  }
}

// Add item to cart
export async function addItemCart(req, res) {
  try {
    const cartItem = new Cart(req.body); // Creating a new cart item instance
    if (!cartItem) {
      // Validating the cart item
      return res.status(400).json({
        message: "Item not available, unable to add item to cart",
      });
    }

    await cartItem.save(); // Saving the cart item to the database
    const cartItems = await Cart.find().lean(); // Fetching all cart items
    res.status(201).json(cartItems); // Sending success response with cart items
  } catch (error) {
    res.status(500).json({
      // Handling errors
      message: "Unable to add item to cart",
      error: error.message,
    });
  }
}

// Update cart product
export async function updateCart(req, res) {
  try {
    const cartProductId = req.params.id; // Extracting cart product ID from request parameters
    const updateData = req.body; // Extracting update data from request body
    const cartProduct = await Cart.findById(cartProductId); // Searching for cart product by ID

    if (!cartProductId) {
      // Validating cart product ID
      return res.status(404).send({ message: "Product Id not found" });
    }

    if (!cartProduct) {
      // Handling case when cart product is not found
      return res.status(404).json({ message: "Cart product not found" });
    }

    Object.keys(updateData).forEach((key) => {
      // Updating cart product fields
      cartProduct[key] = updateData[key];
    });

    const updatedCartProduct = await cartProduct.save(); // Saving updated cart product

    res.status(200).json({
      // Sending success response
      message: "Cart product updated successfully",
      updatedCartProduct,
    });
  } catch (error) {
    res.status(500).json({
      // Handling errors
      message: "Error updating cart product",
      error: error.message,
    });
  }
}

// Delete cart item by ID
export async function deleteCartItem(req, res) {
  try {
    const cartProductId = req.params.id; // Extracting cart product ID from request parameters
    const deletedItem = await Cart.findByIdAndDelete(cartProductId); // Deleting cart item by ID

    if (!cartProductId) {
      // Validating cart product ID
      return res.status(404).send({ message: "Product Id not found" });
    }
    if (!deletedItem) {
      // Handling case when cart item is not found
      return res.status(404).json({ message: "Cart product not found" });
    }

    res.status(200).json({
      // Sending success response
      message: "Cart product deleted successfully",
      deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      // Handling errors
      message: "Error deleting cart product",
      error: error.message,
    });
  }
}

app.post("/login", (req, res) => {
  const user = { username: req.body.username }; // Extracting username from request body
  const accessToken = jwt.sign(user, "secretKey", { expiresIn: "1h" }); // Generating JWT token
  res.json({ token: accessToken }); // Sending response with token
});

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"]; // Extracting authorization header
  const token = authHeader && authHeader.split(" ")[1]; // Extracting token from header
  jwt.verify(token, "secretKey", (err, user) => {
    // Verifying JWT token
    if (err) {
      // Handling invalid token
      res.status(403).json({ message: "Invalid JWT Token" });
    }
    req.user = user; // Storing user info in request object
    next(); // Calling the next middleware
  });
}

// Register Logic
export async function userRegister(req, res) {
  try {
    const { userName, email, password } = req.body; // Extracting registration fields

    // Validate input fields
    if (!userName || !email || !password) {
      // Checking for missing fields
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists by email or username
    const existingUser =
      (await users.findOne({ email })) || (await users.findOne({ userName }));
    if (existingUser) {
      // Handling existing user scenario
      return res.status(409).json({
        message:
          "User or username already exists, please change username/email",
      });
    }

    // Create and save the new user in the database
    const newUser = new users({ userName, email, password }); // Creating new user instance
    await newUser.save(); // Saving user to the database

    res.status(201).json({
      // Sending success response
      message: `${newUser.userName} registered successfully`,
    });
  } catch (error) {
    // Handling unexpected server errors
    res.status(500).json({
      message: "An error occurred while registering the user",
      error: error.message,
    });
  }
}
