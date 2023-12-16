/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { createUserService } from "./user.service";
import { userValidation } from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await createUserService.createUserIntoDB(req.body);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User already exist",
      error: { code: 400, description: "User already exist!" },
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

const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const id = Number(userId);
  const singleUserInfo = await createUserService.singleUserFromDB(id);
  if (singleUserInfo.length === 0) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: { code: 404, description: "User not found!" },
    });
  } else {
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: singleUserInfo,
    });
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const id = Number(userId);
  const result = await createUserService.updateUserIntoDb(id, req.body);
  if (result === null) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: { code: 404, description: "User not found!" },
    });
  } else {
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const id = Number(userId);
  const deleteUserFromDB = await createUserService.deleteUserFromDB(id);
  if (!deleteUserFromDB) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: { code: 404, description: "User not found!" },
    });
  } else {
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const id = Number(userId);
  const orderValidate: any = userValidation.orderSchema.validate(req.body);
  const { value } = orderValidate;
  const order = await createUserService.createOrderIntoDB(id, value);
  if (!order) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: { code: 404, description: "User not found!" },
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const id = Number(userId);
  const allUser = await createUserService.getAllOrderFromDB(id);
  if (allUser.length === 0) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: { code: 404, description: "User not found!" },
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: allUser,
    });
  }
};

const calculateTotalPrice = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const id = Number(userId);
  const result = await createUserService.calculateTotalPriceByUser(id);

  if (result.length === 0) {
    res.status(400).json({
      success: false,
      message: "User not found",
      error: { code: 404, description: "User not found!" },
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: { totalPrice: result },
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUserInfo,
  deleteSingleUser,
  createOrder,
  getAllOrder,
  calculateTotalPrice,
};
