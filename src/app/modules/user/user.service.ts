import { IUser } from "./user.interface";
import { UserModels } from "./user.model";

const createUserIntoDB = async (user: IUser) => {
  const result = await UserModels.create(user);
  return result;
};

export const createUserService = { createUserIntoDB };
