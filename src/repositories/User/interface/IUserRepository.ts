import { User } from '../../../models';

export interface IUserRepository {
  create(userData: Partial<User>): Promise<User>;
  getAll(): Promise<User[]>
}