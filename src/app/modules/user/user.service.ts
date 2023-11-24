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

export const createUserService = { createUserIntoDB, getAllUserFromDB };
