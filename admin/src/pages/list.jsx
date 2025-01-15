import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const List = ({token}) => {
  const [list, setList] = useState([]);

  // Fetch products from the backend
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products.");
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-teal text-center mb-6">
        Product List
      </h1>
      {list.length === 0 ? (
        <p className="text-center text-gray-500 flex-grow flex items-center justify-center">
          No products found.
        </p>
      ) : (
        <div className="overflow-x-auto flex-grow w-full max-w-7xl">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-teal text-white">
              <tr>
                <th className="px-8 lg:px-12 py-4 text-left text-lg">Image</th>
                <th className="px-8 lg:px-12 py-4 text-left text-lg">Name</th>
                <th className="px-8 lg:px-12 py-4 text-left text-lg">
                  Category
                </th>
                <th className="px-8 lg:px-12 py-4 text-left text-lg">Price</th>
                <th className="px-8 lg:px-12 py-4 text-left text-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((product, index) => (
                <tr
                  key={product._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-teal-light transition`}
                >
                  <td className="px-8 lg:px-12 py-4">
                    <img
                      src={product.image || "https://via.placeholder.com/100"}
                      alt={product.name}
                      className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-8 lg:px-12 py-4 text-lg">{product.name}</td>
                  <td className="px-8 lg:px-12 py-4 text-lg">
                    {product.category}
                  </td>
                  <td className="px-8 lg:px-12 py-4 text-lg">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-8 lg:px-12 py-4">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default List;
