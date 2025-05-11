import CommentRepository from "../repository/comment.repository.js";

export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }
  async getAllComments(req, res, next) {
    const { postID } = req.params;
    try {
      const result = await this.commentRepository.getAllCommentsForPost(postID);
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async addComment(req, res, next) {
    const comment = {};
    comment.text = req.body.text;
    comment.post = req.params.postID;
    comment.user = req.userID;
    try {
      const result = await this.commentRepository.addComment(comment);
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    const { commentID } = req.params;
    const userID = req.userID;
    try {
      const result = await this.commentRepository.deleteComment(
        commentID,
        userID
      );
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async updateComment(req, res, next) {
    const { commentID } = req.params;
    const userID = req.userID;
    const updates = req.body;

    if (Object.keys(updates).length === 0 || updates.text.trim() === "") {
      return res
        .status(400)
        .json({ status: false, message: "No valid fields to update." });
    }

    try {
      const result = await this.commentRepository.updateComment(
        commentID,
        userID,
        updates
      );
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }
}
