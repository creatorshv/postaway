import ApplicationError from "../lib/error-handler.js";
import UserModel from "../model/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export default class ProfileRepository {
  async getUserDetails(userID) {
    try {
      const user = await UserModel.findById(userID).select(
        "-password -friendRequests -loginTokens"
      );
      if (!user) {
        throw new ApplicationError("User not found", 404);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await UserModel.find({}).select(
        "-password -friends -friendRequests -loginTokens -posts"
      );
      return users;
    } catch (error) {
      throw error;
    }
  }

  async updateUserDetails(files, userID, updates) {
    try {
      if (files?.avatar) {
        console.log("Temp file path:", files.avatar.tempFilePath);

        const uploadResponse = await cloudinary.uploader.upload(
          files.avatar.tempFilePath
        );
        updates.avatar = uploadResponse.secure_url;
      }

      const user = await UserModel.findByIdAndUpdate(userID, updates, {
        new: true,
        runValidators: true,
      }).select("-password -loginTokens -friendRequests");

      if (!user) {
        throw new ApplicationError("User not found", 404);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
