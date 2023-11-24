import { Model } from "mongoose";

export type IUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: string;
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

// custom instance method
export type UserMethods = {
  isUserExist(id: string): Promise<IUser | null>;
};

export type UserModel = Model<IUser, Record<string, never>, UserMethods>;
