import { Router } from "express";
import { LoginController } from "../controllers/LoginController";
import { LoginRepository } from '../repositories/Login/LoginRepository';
import { LoginService } from '../services/Login/LoginService';

const login: Router = Router();

const userRepository = new LoginRepository()
const loginService = new LoginService(userRepository)
const loginController = new LoginController(loginService)

login.post("/login", (req, res) => loginController.login(req, res));

export default login