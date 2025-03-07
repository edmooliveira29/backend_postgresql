import { Payments } from '../../../models';

export interface IPaymentRepository {
  create(Payment: Partial<Payments>): Promise<Payments>
  read(id: string): Promise<Payments>
  update(Payment: Payments): Promise<Payments | null>
  delete(id: string): Promise<{ deleted: number } | null>
  readAll(created_by: string): Promise<Payments[]>
}