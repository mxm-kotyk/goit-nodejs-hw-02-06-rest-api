import { Schema, model } from "mongoose";

import hooks from "./hooks.js";

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: String,
  phone: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.pre("findOneAndUpdate", hooks.runValidationOnUpdate);

contactSchema.post(["save", "findOneAndUpdate"], hooks.handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
