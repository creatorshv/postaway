import express from "express";
import jwtAuth from "../middleware/jwtAuth.middleware.js";
import ProfileController from "../controller/profile.controller.js";

const profileRouter = express.Router();
const profileController = new ProfileController();

profileRouter.get("/get-details/:userID", (req, res, next) => {
  profileController.getDetails(req, res, next);
});

profileRouter.get("/get-all-details", (req, res, next) => {
  profileController.getAllDetails(req, res, next);
});

profileRouter.put("/update-details/:userID", jwtAuth, (req, res, next) => {
  profileController.updateDetails(req, res, next);
});

export default profileRouter;
