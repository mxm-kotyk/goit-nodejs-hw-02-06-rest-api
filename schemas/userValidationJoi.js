import Joi from "joi";

export const userSignUpValidationSchema = Joi.object({
  password: Joi.string().required().min(6).messages({
    "string.empty": `"password" cannot be an empty field`,
    "any.required": `missing required "password" field`,
    "string.min": `"password" must be at least 6 characters`,
  }),
  email: Joi.string()
    .required()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .messages({
      "string.empty": `"email" cannot be an empty field`,
      "any.required": `missing required "email" field`,
      "string.pattern.base": `invalid email format`,
    }),
  subscription: Joi.string().valid("starter", "pro", "business").messages({
    "string.empty": `"subscription" cannot be an empty field`,
    "any.only": `"subscription" must be one of the following: "starter", "pro", "business"`,
  }),
  token: Joi.string().messages({
    "string.empty": `"token" cannot be an empty field`,
  }),
});

export const userSignInValidationSchema = Joi.object({
  password: Joi.string().required().min(6).messages({
    "string.empty": `"password" cannot be an empty field`,
    "any.required": `missing required "password" field`,
    "string.min": `"password" must be at least 6 characters`,
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

// const validateEmail = userSignupValidationSchema.validate({
//   password: "123456",
//   email: "asd",
//   subscription: ["starter", "pro", "business"],
//   token: "dflskjdflsdkjf",
// });

// console.log(validateEmail.error);
