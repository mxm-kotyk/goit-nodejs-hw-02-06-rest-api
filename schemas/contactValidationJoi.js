import Joi from "joi";

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
