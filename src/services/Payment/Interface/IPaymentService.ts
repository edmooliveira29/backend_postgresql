import { Payments } from '../../../models'

export interface IPaymentService {
  create(payment: Payments): Promise<Payments>
  read(id: string): Promise<Payments>
  update(payment: Payments): Promise<Payments | null>
  delete(id: string): Promise<{ deleted: number } | null>
  readAll(created_by: string): Promise<Payments[]>
}
