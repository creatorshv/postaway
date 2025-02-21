import jwt from "jsonwebtoken";

export default function jwtAuth(req, res, next) {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ status: false, message: "Invalid token." });
    }

    req.userID = decoded.userID;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Authentication failed." });
  }
}
