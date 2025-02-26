import ApplicationError from "../lib/error-handler.js";
import CommentModel from "../model/comment.model.js";
import PostModel from "../model/post.model.js";

export default class CommentRepository {
  async getAllCommentsForPost(postID) {
    try {
      const comments = await CommentModel.find({ post: postID }).populate(
        "user"
      );
      return comments;
    } catch (error) {
      throw error;
    }
  }

  async addComment(comment) {
    try {
      const newComment = new CommentModel(comment);
      await newComment.save();

      await PostModel.findByIdAndUpdate(
        { _id: newComment.post },
        {
          $push: { comments: newComment._id },
        }
      );

      const updatedPost = await PostModel.findById(newComment.post).populate(
        "comments"
      );
      return { comment: newComment, updatedPost };
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(commentID, userID) {
    try {
      const comment = await CommentModel.findOneAndDelete({
        _id: commentID,
        user: userID,
      });

      if (!comment) {
        throw new ApplicationError("Comment not found.", 404);
      }

      await PostModel.findByIdAndUpdate(comment.post, {
        $pull: { comments: commentID },
      });

      return { message: "Comment was deleted successfully." };
    } catch (error) {
      throw error;
    }
  }

  async updateComment(commentID, userID, updates) {
    try {
      const comment = await CommentModel.findOneAndUpdate(
        { _id: commentID, user: userID },
        updates,
        { new: true }
      );

      if (!comment) {
        throw new ApplicationError("Comment not found.", 404);
      }

      return comment;
    } catch (error) {
      throw error;
    }
  }
}
