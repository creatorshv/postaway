import express from "express";
import AuthController from "../controller/auth.controller.js";
import jwtAuth from "../middleware/jwtAuth.middleware.js";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/signup", (req, res, next) => {
  authController.signup(req, res, next);
});

authRouter.post("/login", (req, res, next) => {
  authController.login(req, res, next);
});

authRouter.post("/logout", jwtAuth, (req, res, next) => {
  authController.logout(req, res, next);
});

authRouter.post("/logout-from-all-devices", jwtAuth, (req, res, next) => {
  authController.logoutFromAllDevices(req, res, next);
});

export default authRouter;
