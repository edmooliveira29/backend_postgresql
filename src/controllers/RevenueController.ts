import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { IRevenueService } from '../services/Revenue/Interface/IRepositoryService';

export class RevenueController {
  private revenueService: IRevenueService;

  constructor(revenueService: IRevenueService) {
    this.revenueService = revenueService
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const revenue = await this.revenueService.create(request.body);
      response.status(201).json(revenue);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async read(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const revenue = await this.revenueService.read(id);
      response.json(revenue);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    try {
      const revenue = await this.revenueService.update(request.body);
      if (!revenue) {
        response.status(404).json({ message: "Receita não encontrada" })
      } else {

        response.json({
          message: "Receita atualizada com sucesso!",
          revenue
        });
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const revenueDeleted = await this.revenueService.delete(id);
      if (!revenueDeleted) {
        response.status(404).json({ message: "Receita nao encontrada" })
      } else {
        response.json({
          message: "Receita excluida com sucesso!"
        })
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }


  async readAll(request: Request, response: Response): Promise<void> {
    try {
      const revenues = await this.revenueService.readAll();
      response.json(revenues);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
}
