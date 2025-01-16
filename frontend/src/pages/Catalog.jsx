import React, { useContext, useState } from "react";
import { ShopContext } from "../context/shopContext";
import ProductCatalog from "../components/ProductCatalog";

const Catalog = () => {
  const { products } = useContext(ShopContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");
  const [searchTerm, setSearchTerm] = useState("");

  // Categories for filtering
  const categories = ["Shirts", "Surf", "Accessories", "Footwear", "Swimwear"];

  // Updates the selectedCategories based on check box changes
  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      // Removes the category when unchecked
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      // Add the category when checked
      setSelectedCategories([...selectedCategories, category]); // Merge the array
    }
  };

  // Clear all filters
  const handleClearAll = () => {
    setSelectedCategories([]);
  };

  // Filter products based on selected categories
  const filteredProducts =
    selectedCategories.length === 0
      ? products
      : products.filter((product) =>
          // get the products that have the same category tag
          selectedCategories.includes(product.category)
        );

  // Search for products by name
  const searchedProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply sorting to the searched products
  const sortedProducts = searchedProducts.sort((a, b) => {
    if (sortOption === "priceLowHigh") {
      return a.price - b.price;
    } else if (sortOption === "priceHighLow") {
      return b.price - a.price;
    }
    return 0; // Relevant (default order)
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-teal text-white py-8 mb-8 shadow-lg border-t-2 border-darkTeal">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Catalogue</h1>
          <p className="text-center opacity-90">
            Discover our collection of coastal lifestyle essentials
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 pb-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pl-10 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-3.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter & Sort Section */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-6">
            {/* Filter by Category */}
            <div className="w-full md:w-auto">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Filter by Category
              </h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <label
                    key={category}
                    className={`flex items-center space-x-2 cursor-pointer text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                      selectedCategories.includes(category)
                        ? "bg-teal text-white shadow-md"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCheckboxChange(category)}
                      className="hidden"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
              {selectedCategories.length > 0 && (
                <button
                  className="mt-4 text-teal hover:opacity-80 text-sm font-medium transition-colors duration-200"
                  onClick={handleClearAll}
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="w-full md:w-auto">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Sort By
              </h2>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full md:w-auto border-2 border-gray-200 rounded-lg px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              >
                <option value="relevant">Relevant</option>
                <option value="priceLowHigh">Price - Low to High</option>
                <option value="priceHighLow">Price - High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 pb-16">
          {sortedProducts.map((product) => (
            <ProductCatalog
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
