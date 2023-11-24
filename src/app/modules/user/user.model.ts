import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    maxlength: [18, "Maximum length 18"],
  },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: String },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: {
    type: [String],
    enum: [],
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

// creating a custom instance method
userSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await UserModels.findOne({ id });
  return existingUser;
};

userSchema.pre("save", async function (next) {
  // console.log(this, 'Pre hook: We are working before')
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hasing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const UserModels = model<IUser, UserModel>("UserModel", userSchema);
