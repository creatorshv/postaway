import express from "express";
import PostController from "../controller/post.controller.js";
import jwtAuth from "../middleware/jwtAuth.middleware.js";

const postRouter = express.Router();
const postController = new PostController();

postRouter.get("/all", (req, res, next) => {
  postController.getAllPosts(req, res, next);
});
postRouter.get("/:postID", (req, res, next) => {
  postController.getPost(req, res, next);
});
postRouter.get("/user/:userID", jwtAuth, (req, res, next) => {
  postController.getAllUserPosts(req, res, next);
});
postRouter.post("/", jwtAuth, (req, res, next) => {
  postController.createPost(req, res, next);
});
postRouter.delete("/:postID", jwtAuth, (req, res, next) => {
  postController.deletePost(req, res, next);
});
postRouter.put("/:postID", jwtAuth, (req, res, next) => {
  postController.updatePost(req, res, next);
});

export default postRouter;
