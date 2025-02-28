import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Access denied" });
    }

    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

    if (
      decoded_token !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Access denied" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
