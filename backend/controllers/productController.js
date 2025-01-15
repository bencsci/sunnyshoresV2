import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

// Adding products
const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, reviews } = req.body;

    let imageUrl = null;
    if (req.files && req.files.image && req.files.image[0]) {
      const uploadResponse = await cloudinary.uploader.upload(
        req.files.image[0].path,
        {
          resource_type: "image",
        }
      );
      imageUrl = uploadResponse.secure_url;
    }

    // Parse reviews if provided
    let parsedReviews = [];
    if (reviews) {
      parsedReviews = JSON.parse(reviews); // Ensure reviews is sent as JSON string from the frontend
    }

    // Prepare product data
    const productData = {
      name,
      price,
      description,
      category,
      image: imageUrl, // Add Cloudinary image URL to the product data
      reviews: parsedReviews, // Include reviews
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// List all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Single Product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
