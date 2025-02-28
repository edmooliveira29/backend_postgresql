import { Router } from "express";
import { RevenueRepository } from '../repositories/Revenue/RevenueRepository';
import { RevenueService } from '../services/Revenue/RevenueService';
import { RevenueController } from '../controllers/RevenueController';
import { verifyToken } from '../utils/access-token';

const revenue: Router = Router();

const revenueRepository = new RevenueRepository()
const revenueService = new RevenueService(revenueRepository)
const revenueController = new RevenueController(revenueService)

revenue.post("/revenue", verifyToken,(req, res) => revenueController.create(req, res));
revenue.get("/revenue/:id", verifyToken, (req, res) => revenueController.read(req, res));
revenue.put("/revenue", verifyToken, (req, res) => revenueController.update(req, res));
revenue.delete("/revenue/:id", verifyToken, (req, res) => revenueController.delete(req, res));
revenue.get("/revenues", verifyToken, (req, res) => revenueController.readAll(req, res));

export default revenue;
