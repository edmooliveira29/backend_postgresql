import { Users } from '../../../models'

export interface IUserService {
  create(name: string, email: string, password: string): Promise<{ email: string, id: string, name: string}>
  getAll(): Promise<Users[]>
}