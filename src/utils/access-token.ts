import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from 'dotenv';

config();

export const generateAccessToken = (user: any) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
  return token;
};

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const userId = req.headers["user-id"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token inválido ou ausente" });
    }
    if (!userId) {
      return res.status(401).json({ error: "Verifique se o user-id foi enviado no header" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload
    if (userId !== decoded.id) {
      return res.status(401).json({ error: "Acesso negado, estes dados não pertencem ao usuário logado" });
    }
    next();
  } catch (error) {
    console.log(error)
    return res.status(403).json({ error: "Sessão expirada!" });
  }
};
