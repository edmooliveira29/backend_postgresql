import { Router } from "express";
import { ExpensesRepository } from '../repositories/Expense/ExpenseRepository';
import { verifyToken } from '../utils/access-token';
import { ExpenseService } from '../services/Expense/ExpenseService';
import { ExpenseController } from '../controllers/ExpenseController';
import { ExpenseGroupRepository } from '../repositories/ExpenseGroup/ExpenseGroupRepository';
import { PaymentsRepository } from '../repositories/Payment/PaymentRepository';

const expense: Router = Router();

const expenseRepository = new ExpensesRepository()
const expenseGroupRepository = new ExpenseGroupRepository()
const paymentRepository = new PaymentsRepository()
const expenseService = new ExpenseService(expenseRepository, expenseGroupRepository, paymentRepository)
const expenseController = new ExpenseController(expenseService)

expense.post("/expense", verifyToken,(req, res) => expenseController.create(req, res));
expense.get("/expense/:id", verifyToken, (req, res) => expenseController.read(req, res));
expense.put("/expense", verifyToken, (req, res) => expenseController.update(req, res));
expense.delete("/expense/:id", verifyToken, (req, res) => expenseController.delete(req, res));
expense.get("/expenses/:created_by", verifyToken, (req, res) => expenseController.readAll(req, res));

export default expense;
