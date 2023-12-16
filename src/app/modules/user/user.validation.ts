import Joi from "joi";

const createUserValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required().max(18),
  fullName: {
    firstName: Joi.string().max(15).required(),
    lastName: Joi.string().max(15),
  },
  age: Joi.number(),
  email: Joi.string(),
  isActive: Joi.boolean(),
  hobbies: Joi.array().items(Joi.string()),
  address: {
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  },
  orders: [
    {
      productName: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  ],
});

const updateUserValidationSchema = Joi.object({
  userId: Joi.number().required().optional(),
  username: Joi.string().required().optional(),
  password: Joi.string().required().max(18).optional(),
  fullName: {
    firstName: Joi.string().max(15).required().optional(),
    lastName: Joi.string().max(15).optional(),
  },
  age: Joi.number().optional(),
  email: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
  hobbies: Joi.array().items(Joi.string()).optional(),
  address: {
    street: Joi.string().required().optional(),
    city: Joi.string().required().optional(),
    country: Joi.string().required().optional(),
  },
  orders: [
    {
      productName: Joi.string().optional(),
      price: Joi.number().optional(),
      quantity: Joi.number().optional(),
    },
  ],
});

// Define the schema for a single order object
const orderSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

export const userValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
  orderSchema,
};
