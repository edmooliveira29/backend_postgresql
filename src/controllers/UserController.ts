// src/controllers/UserController.ts
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { IUserService } from '../services/User/Interface/IUserService';

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const { name, email, password } = request.body
      const user = await this.userService.create( name, email, password );
      response.status(201).json(user);
    } catch (err) {
      if (err instanceof QueryFailedError &&
        err.message.includes("duplicate key value violates unique constraint")) {
        response.status(409).json({ error: "Este email já está em uso. Por favor, use outro." });
      } else {
        response.status(500).json({ error: err.message });
      }
    }
  }

  async readAll(response: Response): Promise<void> {
    try {
      const users = await this.userService.readAll();
      response.json(users);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
}
