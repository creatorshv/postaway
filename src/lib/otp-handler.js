import nodemailer from "nodemailer";

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendEmail(email, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "OTP Verification.",
    text: message,
  });
}
