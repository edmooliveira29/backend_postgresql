import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";

export class LoginController {
  private loginService = new LoginService()

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.loginService.login(email, password);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message })
      throw new Error(err.message)
    }
  }
}