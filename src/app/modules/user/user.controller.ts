import { Request, Response } from "express";
import { createUserService } from "./user.service";
import joyvalidationSchema from "./user.validation";
import { IUser } from "./user.interface";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    console.log(user);
    const { error, value } = joyvalidationSchema.validate(user);
    console.log(error, value);

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

// Helper function to remove the password field
function removePasswordField(user: IUser): Omit<IUser, "password"> {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export const userController = { createUser };
