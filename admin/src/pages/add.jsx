import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const add = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [reviews, setReviews] = useState([]);
  const [image, setImage] = useState("");

  // Add new review state
  const [newReviewer, setNewReviewer] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddReview = () => {
    if (newReviewer && newComment && newRating) {
      const newReview = {
        reviewer: newReviewer,
        comment: newComment,
        rating: parseInt(newRating, 10),
      };
      setReviews([...reviews, newReview]);
      setNewReviewer("");
      setNewComment("");
      setNewRating("");
    } else {
      alert("Please fill out all fields for the review.");
    }
  };

  const handleRemoveReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("reviews", JSON.stringify(reviews));

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setReviews([]);
        setNewReviewer("");
        setNewComment("");
        setNewRating("");
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex items-center justify-center py-4 px-4 md:px-8">
      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md w-full max-w-4xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-teal text-center mb-6">
          Add New Item
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter item name"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter price"
                required
              />
            </div>
          </div>

          <div>
            {/* Category */}
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Shirts">Shirts</option>
              <option value="Surf">Surf</option>
              <option value="Accessories">Accessories</option>
              <option value="Footwear">Footwear</option>
              <option value="Swimwear">Swimwear</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter item description"
              required
            />
          </div>

          {/* Upload Image */}
          <div>
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={handleImageUpload}
            />
            {image && (
              <p className="text-sm text-gray-500 mt-2">
                Uploaded: {image.name}
              </p>
            )}
          </div>

          {/* Reviews */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Reviews
            </label>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">Reviewer: {review.reviewer}</p>
                    <p>Comment: {review.comment}</p>
                    <p>Rating: {review.rating}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveReview(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Add New Review */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Reviewer Name"
                  value={newReviewer}
                  onChange={(e) => setNewReviewer(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <input
                  type="text"
                  placeholder="Comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <input
                  type="number"
                  placeholder="Rating"
                  value={newRating}
                  onChange={(e) => setNewRating(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  min="1"
                  max="5"
                />
              </div>
              <button
                type="button"
                onClick={handleAddReview}
                className="mt-4 bg-teal text-white px-4 py-2 rounded-lg hover:bg-darkTeal transition"
              >
                Add Review
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal text-white py-2 rounded-lg font-medium hover:bg-darkTeal transition"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default add;
