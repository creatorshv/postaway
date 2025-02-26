import express from "express";
import CommentController from "../controller/comment.controller.js";
import jwtAuth from "../middleware/jwtAuth.middleware.js";

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.get("/:postID", (req, res, next) => {
  commentController.getAllComments(req, res, next);
});

commentRouter.post("/:postID", jwtAuth, (req, res, next) => {
  commentController.addComment(req, res, next);
});

commentRouter.delete("/:commentID", jwtAuth, (req, res, next) => {
  commentController.deleteComment(req, res, next);
});

commentRouter.put("/:commentID", jwtAuth, (req, res, next) => {
  commentController.updateComment(req, res, next);
});

export default commentRouter;
