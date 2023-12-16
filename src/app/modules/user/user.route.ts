import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../validateRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(userValidation.createUserValidationSchema),
  userController.createUser
);

router.get("/", userController.getAllUser);

router.get("/:userId", userController.getSingleUser);

router.put(
  "/:userId",
  validateRequest(userValidation.updateUserValidationSchema),
  userController.updateUserInfo
);

router.delete("/:userId", userController.deleteSingleUser);

router.put("/:userId/orders", userController.createOrder);
router.get("/:userId/orders", userController.getAllOrder);
router.get("/:userId/orders/total-price", userController.calculateTotalPrice);
export const UserRoutes = router;
