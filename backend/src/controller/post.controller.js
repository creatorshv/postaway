import PostRepository from "../repository/post.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async getAllPosts(req, res, next) {
    try {
      const result = await this.postRepository.getAllPosts();
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async getPost(req, res, next) {
    const { postID } = req.params;
    try {
      const result = await this.postRepository.getPost(postID);

      if (!result) {
        return res
          .status(404)
          .json({ status: false, message: "Post not found" });
      }
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async getAllUserPosts(req, res, next) {
    const { userID } = req.params;
    try {
      const result = await this.postRepository.getAllUserPosts(userID);
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async createPost(req, res, next) {
    const post = req.body;
    const files = req.files;

    if (!post.content && !files?.image) {
      return res.status(400).json({
        status: false,
        message: "Post must contain either content or an image.",
      });
    }

    post.author = req.userID;

    try {
      const result = await this.postRepository.addPost(files, post);
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    const { postID } = req.params;
    const userID = req.userID;
    try {
      await this.postRepository.deletePost(postID, userID);
      res
        .status(200)
        .json({ status: true, nessage: "Post deleted successfully." });
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req, res, next) {
    const userID = req.userID;
    const { postID } = req.params;
    const updates = req.body;

    const allowedFields = ["title", "content", "tags"];
    const filteredUpdates = {};

    for (let key in updates) {
      if (allowedFields.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    }

    if (Object.keys(filteredUpdates).length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "No valid fields to update." });
    }

    try {
      const result = await this.postRepository.updatePost(
        userID,
        postID,
        filteredUpdates
      );
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }
}
