import { Users } from '../../../models';

export interface IUserRepository {
  create(userData: Users): Promise<Users>;
  readAll(): Promise<Users[]>
  get(email: string): Promise<Users | null>
}