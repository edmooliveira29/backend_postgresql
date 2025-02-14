import { Router } from "express";
import { UserController } from "../controllers/UserController";

const users: Router = Router();
const userController = new UserController()
users.post("/users", (req, res) => userController.createUser(req, res));
users.get("/users", (req, res) => userController.getAllUsers(res));

export default users;
