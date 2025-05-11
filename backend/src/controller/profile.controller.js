import bcrypt from "bcrypt";
import ProfileRepository from "../repository/profile.repository.js";

export default class ProfileController {
  constructor() {
    this.profileRepository = new ProfileRepository();
  }

  async getDetails(req, res, next) {
    const userID = req.params.userID;
    try {
      const result = await this.profileRepository.getUserDetails(userID);
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async getAllDetails(req, res, next) {
    try {
      const result = await this.profileRepository.getAllUsers();
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async updateDetails(req, res, next) {
    const { userID } = req.params;
    const updates = req.body;
    const files = req.files;

    if (userID !== req.userID) {
      return res.status(403).json({ status: false, message: "Unauthorized" });
    }

    const allowedFields = ["name", "email", "gender", "avatar"];
    const filteredUpdates = {};

    for (let key in updates) {
      if (allowedFields.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    }

    try {
      const result = await this.profileRepository.updateUserDetails(
        files,
        userID,
        filteredUpdates
      );
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }
}
