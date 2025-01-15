import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const userData = await userModel.findById(userId);

    let cartData = await userData.cartData;

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Added to cart",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;
    const userData = await userModel.findById(userId);

    let cartData = await userData.cartData;
    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {}
};

const mergeCart = async (req, res) => {
  try {
    const { userId, localCart } = req.body;

    const userData = await userModel.findById(userId);
    let serverCart = userData.cartData;

    // Merge local cart with server cart
    // For each item, take the higher quantity
    for (const [itemId, quantity] of Object.entries(localCart)) {
      serverCart[itemId] = Math.max(quantity, serverCart[itemId] || 0);
    }

    await userModel.findByIdAndUpdate(userId, { cartData: serverCart });

    res.json({
      success: true,
      message: "Cart merged successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart, mergeCart };
