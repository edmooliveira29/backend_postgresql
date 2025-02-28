import { Users } from '../../../models';

export interface IUserRepository {
  create(userData: Partial<Users>): Promise<Users>;
  getAll(): Promise<Users[]>
}