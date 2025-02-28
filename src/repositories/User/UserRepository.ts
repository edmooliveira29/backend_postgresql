
import { Users } from "../../models";
import { Repository } from "typeorm";
import { conection } from "../../database/data-source";
import { IUserRepository } from './interface/IUserRepository';

export class UserRepository implements IUserRepository {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = conection.getRepository(Users);
  }

  async create(user: Users): Promise<Users> {
    return await this.userRepository.save(user)
  }

  async readAll(): Promise<Users[]> {
    const users = await this.userRepository.find(
      {
        select: ["id", "name", "email", "created_at", 'updated_at', 'deleted_at']
      }
    )
    return users
  }

  async get(email: string): Promise<Users | null> {
    const user = await this.userRepository.findOneBy({ email })
    return user
  }
}
