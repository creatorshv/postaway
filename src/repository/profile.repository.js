import ApplicationError from "../lib/error-handler.js";
import UserModel from "../model/user.model.js";

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

  async updateUserDetails(userID, updates) {
    try {
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
