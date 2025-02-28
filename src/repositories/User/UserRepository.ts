
import { Users } from "../../models";
import { Repository } from "typeorm";
import { conection } from "../../database/data-source";
import { IUserRepository } from './interface/IUserRepository';

export class UserRepository implements IUserRepository {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = conection.getRepository(Users);
  }

  async create(userData: Partial<Users>): Promise<Users> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user)
  }

  async getAll(): Promise<Users[]> {
    const users = await this.userRepository.find(
      {
        select: ["id", "name", "email"]
      }
    )
    return users
  }

  async get(email: string): Promise<Users | null> {
    const user = await this.userRepository.findOneBy({ email })
    return user
  }
}
