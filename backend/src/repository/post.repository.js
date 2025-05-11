import ApplicationError from "../lib/error-handler.js";
import PostModel from "../model/post.model.js";
import UserModel from "../model/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export default class PostRepository {
  async getAllPosts() {
    try {
      const posts = await PostModel.find({});
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async getPost(postID) {
    try {
      const post = await PostModel.findById(postID);
      return post;
    } catch (error) {
      throw error;
    }
  }

  async getAllUserPosts(userID) {
    try {
      const posts = await PostModel.find({ author: userID });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async addPost(files, post) {
    try {
      if (files?.image) {
        const uploadResponse = await cloudinary.uploader.upload(
          files.image.tempFilePath
        );
        post.image = uploadResponse.secure_url;
      }

      const newPost = new PostModel(post);
      await newPost.save();

      await UserModel.findByIdAndUpdate(
        { _id: newPost.author },
        { $push: { posts: newPost._id } }
      );

      return newPost;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postID, userID) {
    try {
      const deletedPost = await PostModel.findOneAndDelete({
        _id: postID,
        author: userID,
      });

      if (!deletedPost) {
        throw new ApplicationError("Post not found.", 404);
      }

      await UserModel.findByIdAndUpdate(deletedPost.author, {
        $pull: { posts: deletedPost._id },
      });
    } catch (error) {
      throw error;
    }
  }

  async updatePost(userID, postID, filteredUpdates) {
    try {
      const post = await PostModel.findOneAndUpdate(
        { _id: postID, author: userID },
        filteredUpdates,
        { new: true, runValidators: true }
      );

      if (!post) {
        throw new ApplicationError("Post not found.", 404);
      }

      return post;
    } catch (error) {
      throw error;
    }
  }
}
