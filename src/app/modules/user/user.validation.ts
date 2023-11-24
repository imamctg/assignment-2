import Joi from "joi";

const joyvalidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required().max(18),
  fullName: {
    firstName: Joi.string().max(15).required(),
    lastName: Joi.string().max(15),
  },
  age: Joi.string(),
  email: Joi.string(),
  isActive: Joi.boolean(),
  hobbies: Joi.array().items(Joi.string().valid("Reading", "Traveling")),
  address: {
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  },
  orders: [
    {
      product: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  ],
});

export default joyvalidationSchema;
