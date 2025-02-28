import { Revenues } from '../../../models';

export interface IRevenueRepository {
  create(revenue: Revenues): Promise<Revenues>;
  read(id: string): Promise<Revenues>;
  update(revenue: Revenues): Promise<Revenues | null>
  delete(id: string): Promise<{ deleted: number } | null>
  readAll(): Promise<Revenues[]>
}