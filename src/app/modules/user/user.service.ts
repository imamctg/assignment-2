import { IUser } from "./user.interface";
import { UserDocument, UserModels } from "./user.model";

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

const singleUserFromDB = async (userId: number) => {
  const singleUser = await UserModels.findOne({ userId }, { password: 0 });
  return singleUser;
};

const UserService = async (
  userId: number,
  updatedUserData: Partial<UserDocument>
) => {
  const user = await UserModels.findOneAndUpdate(
    { userId },
    { $push: { article: updatedUserData } },
    {
      new: true,
    }
  );
  return user;
};

const deleteUserFromDB = async (userId: number) => {
  const deleteUser = await UserModels.findOneAndDelete({ userId });
  return deleteUser;
};

const createOrderIntoDB = async (userId: number, newOrder: any) => {
  const orders = await UserModels.findOneAndUpdate(
    { userId },
    { newOrder },
    { new: true }
  );
  return orders;
};

export const createUserService = {
  createUserIntoDB,
  getAllUserFromDB,
  singleUserFromDB,
  UserService,
  deleteUserFromDB,

  createOrderIntoDB,
};
