// src/repositories/user/UserRepository.ts

import { User } from "../../models";
import { Repository } from "typeorm";
import { conection } from "../../database/data-source";
import { IUserRepository } from './interface/IUserRepository';

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = conection.getRepository(User);
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user)
  }

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find(
      {
        select: ["id", "name", "email"]
      }
    )
    return users
  }

  async get(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email })
    return user
  }
}
