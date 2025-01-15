import { createContext, useEffect, useState } from "react";
//import { products } from "../assets/assets";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";
  const deliveryFee = 10;
  const tax_rate = 0.15;
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const addToCart = async (itemId) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    console.log(itemId);
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
        console.log(`${backendUrl}/api/cart/add`);
        console.log(token);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    const cartData = structuredClone(cartItems);

    cartData[itemId] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = async () => {
    const subtotal = Object.entries(cartItems).reduce(
      (total, [itemId, quantity]) => {
        const product = products.find((p) => p._id === itemId);
        return total + product.price * quantity;
      },
      0
    );

    const taxes = subtotal * tax_rate;
    const total = subtotal + taxes + deliveryFee;

    return {
      subtotal,
      taxes,
      shipping: deliveryFee,
      total,
    };
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, quantity) => total + quantity,
      0
    );
  };

  useEffect(() => {
    //console.log(cartItems);
  }, [cartItems]);

  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateCartDataFromLogin = async (localCart, localToken) => {
    if (localCart && Object.keys(localCart).length > 0) {
      try {
        // Send the entire local cart to be merged on the backend
        await axios.post(
          `${backendUrl}/api/cart/merge`,
          { localCart },
          { headers: { token: localToken } }
        );

        // After merging, get the updated cart from the server
        await getUserCart(localToken);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };

  const getCartInfo = () => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
      setUserInfo();
    }
  };

  const setUserInfo = async () => {
    try {
      const localToken = localStorage.getItem("token");
      const response = await axios.get(`${backendUrl}/api/user/info`, {
        headers: { token: localToken },
      });
      if (response.data.success) {
        setUser(response.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
    getCartInfo();
  }, []);

  const value = {
    products,
    currency,
    deliveryFee,
    cartItems,
    addToCart,
    user,
    setCartItems,
    updateQuantity,
    getCartAmount,
    getCartCount,
    navigate,
    backendUrl,
    token,
    setToken,
    getCartInfo,
    updateCartDataFromLogin,
    setUserInfo,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
