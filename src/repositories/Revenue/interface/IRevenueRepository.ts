import { Revenue } from '../../../models';

export interface IRevenueRepository {
  create(revenue: Revenue): Promise<Revenue>;
  read(id: string): Promise<Revenue>;
  update(revenue: Revenue): Promise<Revenue[]>
  delete(id: string): Promise<void>
  readAll(): Promise<Revenue[]>
}