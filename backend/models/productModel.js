import mongoose from "mongoose";

// Define a schema for reviews
const reviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true }, // Name of the reviewer
  comment: { type: String, required: true }, // Review comment
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
});

// Define the schema for products
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Single image URL
  category: { type: String, required: true },
  reviews: [reviewSchema], // Array of reviews
  date: { type: Date, default: Date.now }, // Default to the current date
});

// Use existing model if it exists, otherwise create a new one
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
