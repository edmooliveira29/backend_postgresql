import { Revenue } from '../../../models';

export interface IRevenueRepository {
  create(revenue: Partial<Revenue>): Promise<Revenue>;
  read(id: string): Promise<Revenue>;
  update(revenue: Partial<Revenue>): Promise<Revenue[]>
  delete(id: string): Promise<void>
  getAll(): Promise<Revenue[]>
}