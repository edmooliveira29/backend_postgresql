import { conection } from "../database/data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { User } from '../models';
config();

export class LoginService {
  private repository = conection.getRepository(User)

  async login(email: string, password: string) {
    const userFind = await this.repository.findOneBy({ email })

    if (!userFind) {
      throw new Error("Usuário não encontrado")
    }

    const isPasswordValid = await bcrypt.compare(password, userFind.password)

    if (!isPasswordValid) {
      throw new Error("Senha incorreta!");
    }

    const access_token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7Days" });

    return {
      id: userFind.id,
      name: userFind.name,
      email: userFind.email,
      access_token
    }
  }
}