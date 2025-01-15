import React from "react";

const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-gray-600 text-center">
        No reviews yet. Be the first to review this product!
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md"
        >
          <p className="text-gray-800 font-semibold">{review.reviewer}</p>
          <p className="text-sm text-gray-600">{review.comment}</p>
          <p className="text-yellow-500 text-sm">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
