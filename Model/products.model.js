import mongoose from "mongoose";

// ------------------ Product Schema ------------------
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true, // Ensure id is always provided
    unique: true, // Ensure id is unique for each product
  },
  title: {
    type: String,
    required: true, // Title is required
  },
  description: {
    type: String,
    required: true, // Description is required
  },
  category: {
    type: String,
    required: true, // Category is required
  },
  price: {
    type: Number,
    required: true, // Price is required
  },
  discountPercentage: {
    type: Number,
    required: true, // Discount percentage is required
  },
  rating: {
    type: Number,
    required: true, // Rating is required
  },
  stock: {
    type: Number,
    required: true, // Stock is required
  },
  tags: {
    type: [String],
    required: true, // Tags are required
  },
  brand: {
    type: String,
    required: true, // Brand is required
  },
  weight: {
    type: Number,
    required: true, // Weight is required
  },
  dimensions: {
    length: { type: Number, required: true }, // Length is required
    width: { type: Number, required: true }, // Width is required
    height: { type: Number, required: true }, // Height is required
  },
  warrantyInformation: {
    type: String,
    required: true, // Warranty information is required
  },
  shippingInformation: {
    type: String,
    required: true, // Shipping information is required
  },
  availabilityStatus: {
    type: String,
    required: true, // Availability status is required
  },
  reviews: {
    type: [Object],
    required: true, // Reviews are required
  },
  returnPolicy: {
    type: String,
    required: true, // Return policy is required
  },
  minimumOrderQuantity: {
    type: Number,
    required: true, // Minimum order quantity is required
  },
  images: {
    type: [String],
    required: true, // Images are required
  },
});

// ------------------ Cart Schema ------------------
const cartSchema = new mongoose.Schema({
  ItemName: {
    type: String,
    required: true, // Item name is required
  },
  category: {
    type: String,
    required: true, // Category is required
  },
  count: {
    type: Number,
    required: true, // Item count is required
  },
  price: {
    type: Number,
    required: true, // Price is required
  },
  images: {
    type: [String],
    required: true, // Images are required
  },
});

// ------------------ User Schema ------------------
const userSchema = new mongoose.Schema({
  userName: {
    type: String, // User's name
    required: true, // This field is required
    unique: true, // Usernames must be unique
  },
  email: {
    type: String, // User's email
    required: true, // This field is required
    unique: true, // Emails must be unique
  },
  password: {
    type: String, // User's password
    required: true, // This field is required
  },
});

// Exporting the User model based on the user schema
export const users = mongoose.model("User", userSchema);

// Exporting the Cart model based on the cart schema
export const Cart = mongoose.model("Cart", cartSchema);

// Exporting the Product model based on the product schema
const productModel = mongoose.model("Product", productSchema);

export default productModel;
