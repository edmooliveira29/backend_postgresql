import { Request, Response } from "express";
import { ICreditCardTransactionService } from '../services/CreditCardTransaction/Interface/ICreditCardTransactionService';

export class CreditCardTransactionController {
  private creditCardTransactionService: ICreditCardTransactionService;

  constructor(creditCardTransactionService: ICreditCardTransactionService) {
    this.creditCardTransactionService = creditCardTransactionService
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const CreditCard = await this.creditCardTransactionService.create(request.body);
      response.status(201).json(CreditCard);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async read(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const creditCardTransaction = await this.creditCardTransactionService.read(id);
      if (!creditCardTransaction) {
        response.status(404).json({ error: "Transação não encontrada" })
      } else {
        response.json(creditCardTransaction);
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    try {
      const creditCardTransaction = await this.creditCardTransactionService.update(request.body);
      if (!creditCardTransaction) {
        response.status(404).json({ error: "Transação não encontrada" })
      } else {
        response.json({
          message: "Transação atualizada com sucesso!",
          creditCardTransaction
        });
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const CreditCardTransactionDeleted = await this.creditCardTransactionService.delete(id);
      if (!CreditCardTransactionDeleted) {
        response.status(404).json({ error: "Transação nao encontrada" })
      } else {
        response.json({
          message: "Transação excluida com sucesso!"
        })
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }


  async readAll(request: Request, response: Response): Promise<void> {
    try {
      const userId = request.headers["user-id"] as string;

      const creditCardsTransactions = await this.creditCardTransactionService.readAll(userId);
      response.json(creditCardsTransactions);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
}
