import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateAccessToken = (user: any, time: any) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: time,
    }
  );
};
