// src/services/user/UserService.ts

import bcrypt from "bcrypt";
import { User } from "../../models";
import { IUserService } from './Interface/IUserService';
import { IUserRepository } from '../../repositories/User/interface/IUserRepository';

export class UserService implements IUserService {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async create(name: string, email: string, password: string) {
    if (!email || !this.isValidEmail(email)) {
      throw new Error("E-mail inválido");
    }

    const passwordErrors = this.validatePassword(password);
    if (passwordErrors.length > 0) {
      throw new Error(`Senha inválida: A senha deve ter ${passwordErrors.join(", ")}`)
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.userRepository.create({ name, email, password: hashedPassword })

    return {
      email: user.email,
      id: user.id,
      name: user.name
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): string[] {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push("pelo menos 8 caracteres");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("pelo menos nos uma letra minúscula");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("pelo menos uma letra maiúscula");
    }
    if (!/\d/.test(password)) {
      errors.push("pelo menos um número");
    }
    if (!/[@$!%*?&]/.test(password)) {
      errors.push("pelo menos um caractere especial (@$!%*?&)");
    }

    return errors;
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }
}
