import AuthRepository from "../repository/auth.repository.js";

export default class AuthController {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async signup(req, res, next) {
    try {
      const result = await this.authRepository.signup(req.files, req.body);
      res.status(201).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await this.authRepository.login(req.body);
      res
        .status(200)
        .cookie("jwt", result, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "Lax",
          path: "/",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(400).json({ status: false, message: "Login first." });
    }

    try {
      const result = await this.authRepository.logout(req.userID, token);
      res
        .status(200)
        .clearCookie("jwt")
        .json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async logoutFromAllDevices(req, res, next) {
    try {
      const result = await this.authRepository.logoutFromAllDevices(req.userID);
      res.status(200).json({ status: true, message: result.message });
    } catch (error) {
      next(error);
    }
  }
}
