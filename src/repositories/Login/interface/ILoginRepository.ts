import { Users } from '../../../models';

export interface ILoginRepository {
  login(email: string, password: string): Promise<Users>
}