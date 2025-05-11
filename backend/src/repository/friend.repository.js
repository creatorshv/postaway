import ApplicationError from "../lib/error-handler.js";
import UserModel from "../model/user.model.js";

export default class FriendRepository {
  async getUserFriendsList(userID) {
    try {
      const user = await UserModel.findById(userID)
        .select("friends")
        .populate();

      if (!user) {
        throw new ApplicationError("User not found.", 404);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getPendingRequests(userID) {
    try {
      const user = await UserModel.findById(userID).select("friendRequests");

      if (!user) {
        throw new ApplicationError("User not found.", 404);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async toggleFriendship(userID, friendID) {
    try {
      const user = await UserModel.findById(userID).select("friends");
      const friend = await UserModel.findById(friendID).select(
        "friendRequests friends"
      );

      if (!user || !friend) {
        throw new ApplicationError("User not found.", 404);
      }

      if (user.friends.includes(friendID)) {
        // Unfriend
        await UserModel.findByIdAndUpdate(userID, {
          $pull: { friends: friendID },
        });
        await UserModel.findByIdAndUpdate(friendID, {
          $pull: { friends: userID },
        });
        return "Unfriended successfully.";
      }

      if (friend.friendRequests.includes(userID)) {
        // Cancel sent request
        await UserModel.findByIdAndUpdate(friendID, {
          $pull: { friendRequests: userID },
        });
        return "Friend request canceled.";
      }

      // Send friend request
      await UserModel.findByIdAndUpdate(friendID, {
        $push: { friendRequests: userID },
      });
      return "Friend request sent.";
    } catch (error) {
      throw error;
    }
  }

  async respondToFriendRequest(userID, friendID, action) {
    try {
      const user = await UserModel.findById(userID).select(
        "friendRequests friends"
      );
      const friend = await UserModel.findById(friendID).select("friends");

      if (!user || !friend) {
        throw new ApplicationError("User not found.", 404);
      }

      if (!user.friendRequests.includes(friendID)) {
        throw new ApplicationError(
          "No pending friend request from this user.",
          400
        );
      }

      if (action === "accept") {
        await UserModel.findByIdAndUpdate(userID, {
          $pull: { friendRequests: friendID },
          $push: { friends: friendID },
        });
        await UserModel.findByIdAndUpdate(friendID, {
          $push: { friends: userID },
        });
        return "Friend request accepted.";
      }

      if (action === "reject") {
        await UserModel.findByIdAndUpdate(userID, {
          $pull: { friendRequests: friendID },
        });
        return "Friend request rejected.";
      }

      throw new ApplicationError("Invalid action.", 400);
    } catch (error) {
      throw error;
    }
  }
}
