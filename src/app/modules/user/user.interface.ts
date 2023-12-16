import { Document } from "mongoose";
import { Model } from "mongoose";

export type IUser = {
  userId: number;
  username?: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age?: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: [
    {
      productName: string;
      price: number;
      quantity: number;
    }
  ];
};

// Define the interface for the user document methods (instance methods)
export interface UserDocument extends Document {
  isUserExist(id: number): Promise<UserDocument | null>;
}

export interface UsersModel extends Model<UserDocument> {}
