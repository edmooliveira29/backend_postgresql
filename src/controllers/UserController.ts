import { Request, Response } from "express";
import { conection } from "../database/data-source";
import { Users } from "../models/Users";
import { UserService } from "../services/UserService";
import { QueryFailedError } from "typeorm";

export class UserController {
  private userService = new UserService();

  async createUser(request: Request, response: Response): Promise<void> {
    try {
      const { name, email, password } = request.body;
      const user = await this.userService.createUser(name, email, password);

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

  async getAllUsers(response: Response): Promise<void> {
    try {
      const repository = conection.getRepository(Users);
      const users = await repository.find({ order: { name: "ASC" } });
      if (!users || users.length === 0) {
        response.status(404).json({ message: "No users found" });
      }

      response.json(users);
    } catch (err) {
      console.error(err.message);
      response.status(500).json({ error: err.message });
    }
  }
}
