import { IPaymentService } from './Interface/IPaymentService';
import { Payments } from '../../models';
import { IPaymentRepository } from '../../repositories/Payment/interface/IPaymentRepository';

export class PaymentService implements IPaymentService {
  private PaymentRepository: IPaymentRepository

  constructor(PaymentRepository: IPaymentRepository) {
    this.PaymentRepository = PaymentRepository
  }

  async create(Payment: Payments): Promise<Payments> {
    const PaymentRepository = await this.PaymentRepository.create(Payment)
    return PaymentRepository
  }

  async read(id: string): Promise<Payments> {
    const payment = await this.PaymentRepository.read(id)
    const paymentUpdated = await this.PaymentRepository.update(payment)
    delete paymentUpdated.created_by.password
    delete paymentUpdated.created_by.created_at
    delete paymentUpdated.created_by.updated_at
    delete paymentUpdated.created_by.deleted_at
    return paymentUpdated
  }

  async update(Payment: Payments): Promise<Payments | null> {
    const paymentRepository = await this.PaymentRepository.update(Payment)
    return paymentRepository
  }

  async delete(id: string): Promise<{ deleted: number } | null> {
    const payment = await this.read(id)
    return await this.PaymentRepository.delete(id)
  }

  async readAll(created_by: string): Promise<Payments[]> {
    const payments = await this.PaymentRepository.readAll(created_by)
    payments.forEach(Payments => {
      if (Payments.created_by) {
        delete Payments.created_by.password
        delete Payments.created_by.created_at
        delete Payments.created_by.updated_at
        delete Payments.created_by.deleted_at
      }
    })
    return payments
  }
}
