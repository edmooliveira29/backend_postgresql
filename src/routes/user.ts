import { Router } from "express";
import { UserRepository } from '../repositories/User/UserRepository';
import { UserService } from '../services/User/UserService';
import { UserController } from '../controllers/UserController';

const users: Router = Router();
const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

users.post("/users", (req, res) => userController.create(req, res));
users.get("/users", (req, res) =>  userController.readAll(res));

export default users;
