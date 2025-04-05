import { Router } from "express";
import {
  registerUserController,
  verifyEmailController,
  loginController,
  logoutController,
  uploadAvatar,
  updateUserDetails,
  forgotPasswordController,
  verifyForgotPasswordOtpController,
  resetPasswordController,
  refreshTokenController,
} from "../controllers/user.controller.js";

import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

// Define as rotas para o usuário
userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginController);
userRouter.post("/refresh-token", refreshTokenController);

userRouter.get("/logout", auth, logoutController);

userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put("/reset-password", resetPasswordController);
userRouter.put(
  "/verify-forgot-password-otp",
  verifyForgotPasswordOtpController
);

export default userRouter;
