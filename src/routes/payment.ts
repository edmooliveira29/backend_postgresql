import { Router } from "express";
import { PaymentsRepository } from '../repositories/Payment/PaymentRepository';
import { verifyToken } from '../utils/access-token';
import { PaymentService } from '../services/Payment/PaymentService';
import { PaymentController } from '../controllers/PaymentController';

const payment: Router = Router();

const paymentRepository = new PaymentsRepository()
const paymentService = new PaymentService(paymentRepository)
const paymentController = new PaymentController(paymentService)

payment.post("/payment", verifyToken,(req, res) => paymentController.create(req, res));
payment.get("/payment/:id", verifyToken, (req, res) => paymentController.read(req, res));
payment.put("/payment", verifyToken, (req, res) => paymentController.update(req, res));
payment.delete("/payment/:id", verifyToken, (req, res) => paymentController.delete(req, res));
payment.get("/payment/:created_by", verifyToken, (req, res) => paymentController.readAll(req, res));

export default payment;
