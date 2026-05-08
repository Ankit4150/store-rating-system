const Joi = require("joi");
const registerSchema = Joi.object({
  name: Joi.string()
    .min(20)
    .max(60)
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.min": "Name must be at least 20 characters",
      "string.max": "Name must be at most 60 characters",
      "any.required": "Name is required",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid Email",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-16 chars with uppercase & special character",
      "any.required": "Password is required",
    }),

  address: Joi.string()
    .max(400)
    .required()
    .messages({
      "string.max": "Address max 400 characters",
      "any.required": "Address is required",
    }),
});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-16 chars with uppercase & special character",
    }),
});

module.exports = {
  registerSchema,
  loginSchema,
  updatePasswordSchema,
};