import { Request, Response } from "express";
import { createUserService } from "./user.service";
import joyvalidationSchema from "./user.validation";
import { IUser } from "./user.interface";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const { error, value } = joyvalidationSchema.validate(user);

    // It will call service funciton to send data
    const result = await createUserService.createUserIntoDB(value);

    // Respond with the user details excluding the password field
    const userWithoutPassword = removePasswordField(result.toObject());

    // response data
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: userWithoutPassword,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something was wrong",
      error: err,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  const allUser = await createUserService.getAllUserFromDB();
  try {
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: allUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something was wrong",
      data: allUser,
    });
  }
};

const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;

    const singleUserInfo = await createUserService.singleUserFromDB(userId);
    // Checking user exists using a static method
    if (!singleUserInfo) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: [404, "description: User not found"],
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: singleUserInfo,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: [404, "description: User not found"],
    });
  }
};

const updateUserInfo = async (req: Request, res: Response): Promise<void> => {
  const userId: number = parseInt(req.params.userId);
  const updatedUserData = req.body;

  const result = await createUserService.UserService(userId, updatedUserData);
  res.status(200).json({
    success: true,
    data: updatedUserData,
  });
  res.status(400).json({
    success: false,
    data: result,
  });
};

const deleteSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const deleteUserFromDB = await createUserService.deleteUserFromDB(userId);
    if (!deleteUserFromDB) {
      res.status(400).json({
        success: false,
        message: "User not found",
        error: [404, "description: User not found"],
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: deleteUserFromDB,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "user not found to delete",
      err: error,
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { orders } = req.body;
    console.log(orders);
    const { error, value } = joyvalidationSchema.validate(orders);
    console.log(error, value);

    // It will call service funciton to send data
    const result = await createUserService.createOrderIntoDB(userId, orders);
    res.status(200).json({
      success: true,
      message: "Order create successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: error,
    });
  }
};

//Helper function to remove the password field

function removePasswordField(user: IUser): Omit<IUser, "password"> {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUserInfo,
  deleteSingleUser,
  createOrder,
};
