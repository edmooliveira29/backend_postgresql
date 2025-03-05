import { Request, Response } from "express";
import { IExpenseGroupService } from '../services/ExpenseGroup/Interface/IExpenseGroupService';

export class ExpenseGroupController {
  private expenseGroupService: IExpenseGroupService;

  constructor(ExpenseGroupService: IExpenseGroupService) {
    this.expenseGroupService = ExpenseGroupService
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const ExpenseGroup = await this.expenseGroupService.create(request.body);
      response.status(201).json(ExpenseGroup);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async read(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;

      const expenseGroup = await this.expenseGroupService.read(id);
      if (!expenseGroup) {
        response.status(404).json({ error: "Grupo de Despesa não encontrado" })
      } else {
        response.json(expenseGroup);
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    try {
      const ExpenseGroup = await this.expenseGroupService.update(request.body);
      if (!ExpenseGroup) {
        response.status(404).json({ error: "Grupo de Despesa não encontrada" })
      } else {
        response.json({
          message: "Grupo de Despesa atualizado com sucesso!",
          ExpenseGroup
        });
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const ExpenseGroupDeleted = await this.expenseGroupService.delete(id);
      if (!ExpenseGroupDeleted) {
        response.status(404).json({ error: "Grupo de Despesa nao encontrado" })
      } else {
        response.json({
          message: "Grupo de Despesa excluida com sucesso!"
        })
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async readAll(request: Request, response: Response): Promise<void> {
    try {
      const userId = request.headers["user-id"] as string;

      const expenseGroups = await this.expenseGroupService.readAll(userId);
      response.json(expenseGroups);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
}
