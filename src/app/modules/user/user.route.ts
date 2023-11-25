import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/", userController.createUser);

router.get("/", userController.getAllUser);

router.get("/:userId", userController.getSingleUser);

router.put("/:userId", userController.updateUserInfo);

router.delete("/:userId", userController.deleteSingleUser);

router.put("/:userId/orders", userController.createOrder);
export const UserRoutes = router;
