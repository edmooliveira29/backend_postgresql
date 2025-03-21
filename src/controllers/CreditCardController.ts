import { Request, Response } from "express";
import { ICreditCardService } from '../services/CreditCard/Interface/ICreditCardService';

export class CreditCardController {
  private CreditCardService: ICreditCardService;

  constructor(CreditCardService: ICreditCardService) {
    this.CreditCardService = CreditCardService
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const CreditCard = await this.CreditCardService.create(request.body);
      response.status(201).json(CreditCard);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async read(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const CreditCard = await this.CreditCardService.read(id);
      if (!CreditCard) {
        response.status(404).json({ message: "Cartão de crédito não encontrado" })
      } else {
        response.json(CreditCard);
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    try {
      const CreditCard = await this.CreditCardService.update(request.body);
      if (!CreditCard) {
        response.status(404).json({ message: "Receita não encontrada" })
      } else {

        response.json({
          message: "Receita atualizada com sucesso!",
          CreditCard
        });
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const CreditCardDeleted = await this.CreditCardService.delete(id);
      if (!CreditCardDeleted) {
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
      const CreditCards = await this.CreditCardService.readAll();
      response.json(CreditCards);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
}
