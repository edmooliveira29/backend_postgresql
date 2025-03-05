import { Router } from "express";
import { verifyToken } from '../utils/access-token';
import { ExpenseGroupRepository } from '../repositories/ExpenseGroup/ExpenseGroupRepository';
import { ExpensesGroupService } from '../services/ExpenseGroup/ExpenseGroupService';
import { ExpensesRepository } from '../repositories/Expense/ExpenseRepository';
import { ExpenseGroupController } from '../controllers/ExpenseGroupController';

const expenseGroup: Router = Router();

const expenseGroupRepository = new ExpenseGroupRepository()
const expenseRepository = new ExpensesRepository()
const expenseGroupService = new ExpensesGroupService(expenseRepository, expenseGroupRepository)
const expenseGroupController = new ExpenseGroupController(expenseGroupService)

expenseGroup.post("/expense-group", verifyToken,(req, res) => expenseGroupController.create(req, res));
expenseGroup.get("/expense-group/:id", verifyToken, (req, res) => expenseGroupController.read(req, res));
expenseGroup.put("/expense-group", verifyToken, (req, res) => expenseGroupController.update(req, res));
expenseGroup.delete("/expense-group/:id", verifyToken, (req, res) => expenseGroupController.delete(req, res));
expenseGroup.get("/expense-groups/:created_by", verifyToken, (req, res) => expenseGroupController.readAll(req, res));

export default expenseGroup;
