import Joi from "joi";

export const userValidationSchema = Joi.object({
  password: Joi.string().required().min(6).messages({
    "string.empty": `"password" cannot be an empty field`,
    "any.required": `missing required "password" field`,
    "string.min": `password must be at least 6 characters`,
  }),
  email: Joi.string()
    .required()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .messages({
      "string.empty": `"email" cannot be an empty field`,
      "any.required": `missing required "email" field`,
      "string.pattern.base": `invalid email format`,
    }),
});
