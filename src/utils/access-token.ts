import jwt from "jsonwebtoken";
import { config } from 'dotenv';

config();

export const generateAccessToken = (user: any) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
  return token;
};