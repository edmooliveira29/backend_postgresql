import { Users } from '../../../models';

export interface IUserRepository {
  create(userData: Partial<Users>): Promise<Users>;
  readAll(): Promise<Users[]>
  get(email: string): Promise<Users | null>
}