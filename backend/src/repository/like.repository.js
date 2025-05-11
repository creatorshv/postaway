import ApplicationError from "../lib/error-handler.js";
import PostModel from "../model/post.model.js";

export default class LikeRepository {
  async getPostLikes(postID) {
    try {
      const likedPost = await PostModel.findById(postID).select(
        "title author content image likes likedBy"
      );

      if (!likedPost) {
        throw new ApplicationError("Post not found.", 404);
      }
      return likedPost;
    } catch (error) {
      throw error;
    }
  }

  async likePost(postID, userID) {
    try {
      const post = await PostModel.findById(postID);
      if (!post) {
        throw new ApplicationError("Post not found.", 404);
      }

      const hasLiked = post.likedBy.some((id) => id.toString() === userID);

      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postID },
        hasLiked
          ? { $inc: { likes: -1 }, $pull: { likedBy: userID } }
          : { $inc: { likes: 1 }, $addToSet: { likedBy: userID } },
        { new: true }
      );

      return updatedPost;
    } catch (error) {
      throw error;
    }
  }
}
