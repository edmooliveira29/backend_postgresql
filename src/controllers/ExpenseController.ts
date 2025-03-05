import { Request, Response } from "express";
import { IExpenseService } from '../services/Expense/Interface/IExpenseService';

export class ExpenseController {
  private expenseService: IExpenseService;

  constructor(ExpenseService: IExpenseService) {
    this.expenseService = ExpenseService
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const Expense = await this.expenseService.create(request.body);
      response.status(201).json(Expense);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async read(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;

      const expense = await this.expenseService.read(id);
      if (!expense) {
        response.status(404).json({ error: "Despesa não encontrado" })
      } else {
        response.json(expense);
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    try {
      const Expense = await this.expenseService.update(request.body);
      if (!Expense) {
        response.status(404).json({ error: "Despesa não encontrada" })
      } else {
        response.json({
          message: "Despesa atualizada com sucesso!",
          Expense
        });
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const ExpenseDeleted = await this.expenseService.delete(id);
      if (!ExpenseDeleted) {
        response.status(404).json({ error: "Despesa nao encontrado" })
      } else {
        response.json({
          message: "Despesa excluida com sucesso!"
        })
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async readAll(request: Request, response: Response): Promise<void> {
    try {
      const userId = request.headers["user-id"] as string;

      const expenses = await this.expenseService.readAll(userId);
      response.json(expenses);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
}
