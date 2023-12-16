/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser } from "./user.interface";
import { UserModels } from "./user.model";

const createUserIntoDB = async (user: IUser) => {
  const result = await UserModels.create(user);
  return result;
};

const getAllUserFromDB = async () => {
  const allUser = UserModels.aggregate([
    {
      $project: {
        _id: 0,
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);

  return allUser;
};

const singleUserFromDB = async (userId: number) => {
  const singleUser = await UserModels.aggregate([
    { $match: { userId } },
    {
      $project: {
        _id: 0,
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
      },
    },
  ]);

  return singleUser;
};

const updateUserIntoDb = async (userId: number, payload: Partial<IUser>) => {
  const { fullName, hobbies, address, ...remainingUserData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingUserData,
  };

  if (fullName && Object.keys(fullName).length) {
    for (const [key, value] of Object.entries(fullName)) {
      modifiedUpdatedData[`fullName.${key}`] = value;
    }
  }

  if (hobbies && Object.keys(hobbies).length) {
    for (const [key, value] of Object.entries(hobbies)) {
      modifiedUpdatedData[`hobbies.${key}`] = value;
    }
  }
  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedUpdatedData[`address.${key}`] = value;
    }
  }
  const result = await UserModels.findOneAndUpdate(
    { userId },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const deleteUser = await UserModels.findOneAndDelete({ userId });
  return deleteUser;
};

const createOrderIntoDB = async (userId: number, payload: Partial<IUser>) => {
  const finduser = await UserModels.findOne({ userId });

  for (const key in finduser) {
    const order = await UserModels.findOneAndUpdate(
      { userId },
      { $addToSet: { orders: payload } },
      {
        new: true,
        _id: false,
      }
    );
    return order;
  }
};

const getAllOrderFromDB = async (userId: number) => {
  const order = await UserModels.aggregate([
    { $match: { userId: userId } },
    { $project: { orders: 1, _id: 0 } },
  ]);

  return order;
};

const calculateTotalPriceByUser = async (userId: number) => {
  const orders = await UserModels.aggregate([
    { $match: { userId: +userId } }, // Match documents with the specified userId
    {
      $project: {
        _id: 0, // Exclude the _id field
        orders: {
          $map: {
            input: "$orders",
            as: "order",
            in: {
              totalPrice: {
                $sum: {
                  $multiply: ["$$order.price", "$$order.quantity"],
                },
              },
            },
          },
        },
      },
    },
  ]);

  if (orders.length === 0) {
    return orders;
  } else {
    // Extract the 'totalPrice' values and sum them
    const totalSum = orders[0].orders.reduce(
      (sum: number, order: any) => sum + order.totalPrice,
      0
    );
    return totalSum;
  }
};
export const createUserService = {
  createUserIntoDB,
  getAllUserFromDB,
  singleUserFromDB,
  updateUserIntoDb,
  deleteUserFromDB,
  createOrderIntoDB,
  getAllOrderFromDB,
  calculateTotalPriceByUser,
};
