import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, unique: true, required: false },
  password: {
    type: String,
    required: true,
    maxlength: [18, "Maximum length 18"],
  },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number },
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

// Custom static method to check if a user exists by ID
userSchema.statics.doesUserExistById = async function (userId) {
  const user = await this.findOne({ userId });
  return !!user;
};

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hasing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
  },
});
export const UserModels = model<IUser>("UserModels", userSchema);
