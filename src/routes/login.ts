import { Router } from "express";
import { LoginController } from "../controllers/LoginController";

const login: Router = Router();

const loginController = new LoginController()

login.post("/login", (req, res) => loginController.login(req, res));
// login.post("/logout", (req, res) => loginController.logout(req, res));

export default login