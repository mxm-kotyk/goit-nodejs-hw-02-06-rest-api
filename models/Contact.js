import { Schema, model } from "mongoose";
import Joi from "joi";

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

contactSchema.pre(
  ["findOneAndUpdate", "findOneAndDelete"],
  hooks.runValidationOnUpdate
);

contactSchema.post(["save", "findOneAndUpdate"], hooks.handleSaveError);

export const contactValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `"name" cannot be an empty field`,
    "any.required": `missing required "name" field`,
  }),
  email: Joi.string().required().messages({
    "string.empty": `"email" cannot be an empty field`,
    "any.required": `missing required "email" field`,
  }),
  phone: Joi.string().required().messages({
    "string.empty": `"phone" cannot be an empty field`,
    "any.required": `missing required "phone" field`,
  }),
  favorite: Joi.bool(),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required().messages({
    "any.required": `missing required "favorite" field`,
  }),
});

const Contact = model("contact", contactSchema);

export default Contact;
