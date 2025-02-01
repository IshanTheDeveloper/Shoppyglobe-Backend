import productModel from "../Model/products.model.js";

// Function to create a new product
export function createProducts(req, res) {
  // Destructuring the product details from the request body
  const {
    id,
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    images,
  } = req.body;

  // Validate input fields to ensure all required fields are provided
  if (
    !id ||
    !title ||
    !description ||
    !category ||
    !price ||
    !discountPercentage ||
    !rating ||
    !stock ||
    !tags ||
    !brand ||
    !weight ||
    !dimensions ||
    !warrantyInformation ||
    !shippingInformation ||
    !availabilityStatus ||
    !reviews ||
    !returnPolicy ||
    !minimumOrderQuantity ||
    !images
  ) {
    // Return a 400 Bad Request response if any field is missing
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create a new product instance with the provided data
  const newProduct = new productModel({
    id,
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    images,
  });

  // Save the new product to the database
  newProduct
    .save()
    .then((data) => {
      if (!data) {
        // Return a 400 Bad Request response if saving fails without a specific error
        return res.status(400).json({ message: "Something went wrong" });
      }
      // Send the saved product data in the response
      res.send(data);
    })
    .catch((error) => {
      // Handle any errors that occur while saving the product
      res
        .status(500)
        .json({ message: "Error saving product", error: error.message });
    });
}
