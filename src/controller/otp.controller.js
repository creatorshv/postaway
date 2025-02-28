import OtpRepository from "../repository/otp.repository.js";

export default class OtpController {
  constructor() {
    this.otpRepository = new OtpRepository();
  }

  async sendOtp(req, res, next) {
    try {
      const { email } = req.body;
      const message = await this.otpRepository.sendOtp(email);
      res.status(200).json({ status: true, message });
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(req, res, next) {
    try {
      const { email, otp } = req.body;
      const message = await this.otpRepository.verifyOtp(email, otp);
      res.status(200).json({ status: true, message });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email, newPassword, otp } = req.body;
      const message = await this.otpRepository.resetPassword(
        email,
        newPassword,
        otp
      );
      res.status(200).json({ status: true, message });
    } catch (error) {
      next(error);
    }
  }
}
