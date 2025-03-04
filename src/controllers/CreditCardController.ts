import { Request, Response } from "express";
import { ICreditCardService } from '../services/CreditCard/Interface/ICreditCardService';

export class CreditCardController {
  private creditCardService: ICreditCardService;

  constructor(CreditCardService: ICreditCardService) {
    this.creditCardService = CreditCardService
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const CreditCard = await this.creditCardService.create(request.body);
      response.status(201).json(CreditCard);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async read(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;

      const creditCard = await this.creditCardService.read(id);
      if (!creditCard) {
        response.status(404).json({ error: "Cartão de crédito não encontrado" })
      } else {
        response.json(creditCard);
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    try {
      const CreditCard = await this.creditCardService.update(request.body);
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
      const CreditCardDeleted = await this.creditCardService.delete(id);
      if (!CreditCardDeleted) {
        response.status(404).json({ error: "Cartão de crédito nao encontrado" })
      } else {
        response.json({
          message: "Cartão de crédito e suas transações excluidas com sucesso!"
        })
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async readAll(request: Request, response: Response): Promise<void> {
    try {
      const userId = request.headers["user-id"] as string;

      const creditCards = await this.creditCardService.readAll(userId);
      response.json(creditCards);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
}
