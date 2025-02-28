import { Revenue } from '../../../models'

export interface IRevenueService {
  create(revenue: Revenue): Promise<Revenue>
  read(id: string): Promise<Revenue>
  update(revenue: Revenue): Promise<Revenue[]>
  delete(id: string): Promise<{ message: string }>
  readAll(): Promise<Revenue[]>  
}
