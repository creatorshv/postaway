import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";
import ApplicationError from "../lib/error-handler.js";

export default class AuthRepository {
  async signup(user) {
    const { password } = user;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;

      const newUser = new UserModel(user);
      await newUser.save();

      // Return only selected fields
      return UserModel.findById(newUser._id).select(
        "-password -friendRequests -loginTokens -createdAt -updatedAt"
      );
    } catch (error) {
      throw error;
    }
  }

  async login(user) {
    try {
      const fetchedUser = await UserModel.findOne({ email: user.email });

      if (!fetchedUser) {
        throw new ApplicationError("User not found.", 404);
      }

      const checkPassword = await bcrypt.compare(
        user.password,
        fetchedUser.password
      );

      if (!checkPassword) {
        throw new ApplicationError("Incorrect password.", 400);
      }

      const token = jwt.sign(
        { userID: fetchedUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      fetchedUser.loginTokens.push(token);
      await fetchedUser.save();

      return token;
    } catch (error) {
      throw error;
    }
  }

  async logout(userID, token) {
    try {
      const user = await UserModel.findByIdAndUpdate(
        userID,
        [
          {
            $set: {
              loginTokens: {
                $filter: {
                  input: "$loginTokens",
                  as: "token",
                  cond: { $ne: ["$$token", token] },
                },
              },
            },
          },
        ],
        { new: true }
      );

      if (!user) {
        throw new ApplicationError("Logout failed or user not found.", 400);
      }

      return { message: "Logged out from this device." };
    } catch (error) {
      throw error;
    }
  }

  async logoutFromAllDevices(userID) {
    try {
      const user = await UserModel.findById(userID);

      if (!user) {
        throw new ApplicationError("User not found.", 404);
      }

      user.loginTokens = [];
      await user.save();

      return { message: "Logged out from all devices." };
    } catch (error) {
      throw error;
    }
  }
}
