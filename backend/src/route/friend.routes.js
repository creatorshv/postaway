import express from "express";
import jwtAuth from "../middleware/jwtAuth.middleware.js";
import FriendController from "../controller/friend.controller.js";

const friendRouter = express.Router();
const friendController = new FriendController();

friendRouter.get("/get-friends/:userID", jwtAuth, (req, res, next) => {
  friendController.getUserFriendsList(req, res, next);
});

friendRouter.get("/get-pending-requests", jwtAuth, (req, res, next) => {
  friendController.getPendingRequests(req, res, next);
});

friendRouter.post("/toggle-friendship/:friendID", jwtAuth, (req, res, next) => {
  friendController.toggleFriendship(req, res, next);
});

friendRouter.post(
  "/response-to-request/:friendID",
  jwtAuth,
  (req, res, next) => {
    friendController.respondToFriendRequest(req, res, next);
  }
);

export default friendRouter;
