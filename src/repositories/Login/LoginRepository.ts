
import { Users } from "../../models";
import { Repository } from "typeorm";
import { conection } from "../../database/data-source";
import { ILoginRepository } from './interface/ILoginRepository';

export class LoginRepository implements ILoginRepository {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = conection.getRepository(Users);
  }

  async login(email: string): Promise<Users | null> {
    const user = await this.userRepository.findOneBy({ email })
    return user
  }
}
