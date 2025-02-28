import { Users } from '../../../models'

export interface ILoginService {
  login(email: string, password: string): Promise<{
    email: string,
    id: string,
    name: string,
    access_token: string
  }>
}