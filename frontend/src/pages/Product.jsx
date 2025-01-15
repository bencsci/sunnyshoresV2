import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ShopContext } from "../context/shopContext";
import ProductItem from "../components/ProductItem";
import Reviews from "../components/Review";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);

  const fetchProductData = async () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
    } else {
      setProductData(undefined); // Indicate no product was found
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData();
    }
  }, [productId, products]);

  if (productData === undefined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-4">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Link
          to="/catalog"
          className="bg-teal text-white px-6 py-2 rounded shadow hover:bg-teal-500 transition"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading product...</p>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (item) => item.category === productData.category && item._id !== productId
  );

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Product Section */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Gallery Section */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-gray-100">
                <img
                  src={productData.image}
                  alt={productData.name}
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {productData.name}
                  </h1>
                  <span className="inline-block bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm">
                    {productData.category}
                  </span>
                </div>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {productData.description}
                </p>

                <div className="mb-8">
                  <p className="text-3xl font-bold text-teal-600">
                    {productData.currency || "$"}
                    {productData.price}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Product Features
                  </h3>
                  <ul className="grid grid-cols-2 gap-4">
                    {[
                      "High-quality materials",
                      "Eco-friendly manufacturing",
                      "Available in multiple sizes",
                      "Perfect for outdoor activities",
                    ].map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-gray-700"
                      >
                        <svg
                          className="w-5 h-5 text-teal-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(productData._id);
                  toast.success("Item added to cart!");
                }}
                className="w-full bg-teal hover:bg-darkTeal text-white py-4 px-8 rounded-xl font-semibold text-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <Reviews reviews={productData.reviews} />
        </div>

        {/* Related Products Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <ProductItem
                  key={product._id}
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-3">
                No related products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
