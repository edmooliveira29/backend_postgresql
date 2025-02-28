import { Router } from "express";
import { RevenueRepository } from '../repositories/Revenue/ReveneRepository';
import { RevenueService } from '../services/Revenue/RevenueService';
import { RevenueController } from '../controllers/RevenueController';

const revenue: Router = Router();

const loginRepository = new RevenueRepository()
const loginService = new RevenueService(loginRepository)
const loginController = new RevenueController(loginService)

revenue.post("/revenue", (req, res) => loginController.create(req, res));
revenue.get("/revenue/:id", (req, res) => loginController.read(req, res));
revenue.put("/revenue", (req, res) => loginController.update(req, res));
revenue.delete("/revenue/:id", (req, res) => loginController.delete(req, res));
revenue.get("/revenue", (req, res) => loginController.readAll(req, res));

export default revenue;
