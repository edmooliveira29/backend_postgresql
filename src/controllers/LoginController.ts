import { Request, Response } from "express";
import { ILoginService } from '../services/Login/Interface/ILoginService';

export class LoginController {
  private loginService: ILoginService

  constructor(loginService: ILoginService) {
    this.loginService = loginService
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.loginService.login(email, password);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}