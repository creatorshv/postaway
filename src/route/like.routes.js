import express from "express";
import LikeController from "../controller/like.controller.js";
import jwtAuth from "../middleware/jwtAuth.middleware.js";

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.get("/:postID", jwtAuth, (req, res, next) => {
  likeController.getPostLikes(req, res, next);
});

likeRouter.post("/toggle/:postID", jwtAuth, (req, res, next) => {
  likeController.likePost(req, res, next);
});

export default likeRouter;
