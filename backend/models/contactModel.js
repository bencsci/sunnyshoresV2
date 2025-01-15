import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const contactModel =
  mongoose.models.contact || mongoose.model("contactMessage", contactSchema);

export default contactModel;
