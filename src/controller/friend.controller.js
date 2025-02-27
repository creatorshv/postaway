import FriendRepository from "../repository/friend.repository.js";

export default class FriendController {
  constructor() {
    this.friendRepository = new FriendRepository();
  }

  async getUserFriendsList(req, res, next) {
    const { userID } = req.params;
    try {
      const result = await this.friendRepository.getUserFriendsList(userID);
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async getPendingRequests(req, res, next) {
    const userID = req.userID;
    try {
      const result = await this.friendRepository.getPendingRequests(userID);
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async toggleFriendship(req, res, next) {
    const userID = req.userID;
    const { friendID } = req.params;

    if (userID === friendID) {
      return res
        .status(400)
        .json({ status: false, message: "Can't befriend yourself." });
    }

    try {
      const result = await this.friendRepository.toggleFriendship(
        userID,
        friendID
      );
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async respondToFriendRequest(req, res, next) {
    const userID = req.userID;
    const { friendID } = req.params;
    const { action } = req.body;
    const validResponses = ["accept", "reject"];

    try {
      if (!validResponses.includes(action)) {
        return res.status(400).json({
          status: false,
          message: "Invalid action. Use 'accept' or 'reject'.",
        });
      }

      const message = await this.friendRepository.respondToFriendRequest(
        userID,
        friendID,
        action
      );
      res.status(200).json({ status: true, message });
    } catch (error) {
      next(error);
    }
  }
}
