import { Repository } from 'typeorm';
import { IPaymentRepository } from './interface/IPaymentRepository';
import { conection } from '../../database/data-source';
import { Payments } from '../../models';

export class PaymentsRepository implements IPaymentRepository {
  private paymentRepository: Repository<Payments>;

  constructor() {
    this.paymentRepository = conection.getRepository(Payments);
  }

  async create(Payment: Payments): Promise<Payments> {
    return await this.paymentRepository.save(Payment);
  }

  async read(id: string): Promise<Payments> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['created_by', "Payment_group_id"],
      select: ['id', "observations", 'paid_value', "payment_date", "payment_status", "created_by"]
    });
    return payment
  }

  async update(Payment: Payments): Promise<Payments | null> {
    const existingPayment = await this.paymentRepository.findOne({ where: { id: Payment.id } });
    if (!existingPayment || !Payment.id) {
      return null;
    }

    Object.assign(existingPayment, Payment);

    return await this.paymentRepository.save(existingPayment);
  }


  async delete(id: string): Promise<{ deleted: number } | null> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!payment || payment.deleted_at) {
      return null
    } else {
      return {
        deleted: (await this.paymentRepository.softDelete({ id })).affected
      }
    }
  }

  async readAll(created_by: string): Promise<Payments[]> {
    if (created_by === undefined) {
      throw new Error('created_by is undefined')
    }

    const Payments = await this.paymentRepository.find({
      where: {
        created_by: {
          id: created_by
        }
      },
      relations: ['created_by'],
      select: ['id', "observations", 'paid_value', "payment_date", "payment_status", "created_by"]
    })
    return Payments
  }
}
