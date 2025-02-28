import OtpModel from "../model/otp.model.js";
import UserModel from "../model/user.model.js";
import ApplicationError from "../lib/error-handler.js";
import { generateOtp, sendEmail } from "../lib/otp-handler.js";
import bcrypt from "bcrypt";

export default class OtpRepository {
  async sendOtp(email) {
    const otp = generateOtp();
    await OtpModel.findOneAndUpdate(
      { email },
      { otp, expiresAt: Date.now() + 5 * 60 * 1000 },
      { upsert: true, new: true }
    );
    await sendEmail(email, `Your OTP is: ${otp}`);
    return "OTP sent successfully.";
  }

  async verifyOtp(email, otp) {
    const record = await OtpModel.findOne({ email });
    if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
      throw new ApplicationError("Invalid or expired OTP.", 400);
    }
    return "OTP verified successfully.";
  }

  async resetPassword(email, newPassword, otp) {
    const record = await OtpModel.findOne({ email });
    if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
      throw new ApplicationError("Invalid or expired OTP.", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });
    await OtpModel.deleteOne({ email });

    return "Password reset successfully.";
  }
}
