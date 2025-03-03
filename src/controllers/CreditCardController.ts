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
        response.status(404).json({ error: "Cartão de crédito não encontrado" })
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
        response.status(404).json({ error: "Cartão de crédito não encontrada" })
      } else {
        response.json({
          message: "Cartão de crédito atualizada com sucesso!",
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
        response.status(404).json({ error: "Cartão de crédito nao encontrada" })
      } else {
        response.json({
          message: "Cartão de crédito excluido com sucesso!"
        })
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }


  async readAll(request: Request, response: Response): Promise<void> {
    try {
      const userId = request.headers["user-id"] as string;

      console.log(userId)
      const CreditCards = await this.CreditCardService.readAll(userId);
      response.json(CreditCards);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
}
