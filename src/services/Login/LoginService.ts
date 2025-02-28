import bcrypt from "bcrypt";
import { generateAccessToken } from '../../utils/access-token';
import { ILoginService } from './Interface/ILoginService';
import { ILoginRepository } from '../../repositories/Login/interface/ILoginRepository';

export class LoginService implements ILoginService {
  private loginRepository: ILoginRepository

  constructor(userRepository: ILoginRepository) {
    this.loginRepository = userRepository
  }

  async login(email: string, password: string) {
    const userFind = await this.loginRepository.login(email, password)

    if (!userFind) {
      throw new Error("Usuário não encontrado")
    }

    const isPasswordValid = await bcrypt.compare(password, userFind.password)

    if (!isPasswordValid) {
      throw new Error("Senha incorreta!");
    }

    const access_token = generateAccessToken(userFind)
    return {
      id: userFind.id,
      name: userFind.name,
      email: userFind.email,
      access_token
    }
  }
}
