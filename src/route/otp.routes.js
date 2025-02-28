import express from "express";
import OtpController from "../controller/otp.controller.js";
import authMiddleware from "../middleware/jwtAuth.middleware.js"; // If needed

const otpRouter = express.Router();
const otpController = new OtpController();

otpRouter.post("/send", otpController.sendOtp.bind(otpController));

otpRouter.post("/verify", otpController.verifyOtp.bind(otpController));

otpRouter.post(
  "/reset-password",
  otpController.resetPassword.bind(otpController)
);

export default otpRouter;
