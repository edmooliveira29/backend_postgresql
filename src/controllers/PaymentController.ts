import { Request, Response } from "express";
import { IPaymentService } from '../services/Payment/Interface/IPaymentService';

export class PaymentController {
  private PaymentService: IPaymentService;

  constructor(PaymentService: IPaymentService) {
    this.PaymentService = PaymentService
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const Payment = await this.PaymentService.create(request.body);
      response.status(201).json(Payment);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async read(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;

      const Payment = await this.PaymentService.read(id);
      if (!Payment) {
        response.status(404).json({ error: "Pagamento não encontrado" })
      } else {
        response.json(Payment);
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    try {
      const Payment = await this.PaymentService.update(request.body);
      if (!Payment) {
        response.status(404).json({ error: "Pagamento não encontrada" })
      } else {
        response.json({
          message: "Pagamento atualizada com sucesso!",
          Payment
        });
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const PaymentDeleted = await this.PaymentService.delete(id);
      if (!PaymentDeleted) {
        response.status(404).json({ error: "Pagamento nao encontrado" })
      } else {
        response.json({
          message: "Pagamento excluida com sucesso!"
        })
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  async readAll(request: Request, response: Response): Promise<void> {
    try {
      const userId = request.headers["user-id"] as string;

      const Payments = await this.PaymentService.readAll(userId);
      response.json(Payments);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
}
