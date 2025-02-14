import { conection } from "../database/data-source";
import { Users } from "../models";

export class UserService {
  private repository = conection.getRepository(Users);

  async createUser(name: string, email: string, password: string) {
    if (!email || !this.isValidEmail(email)) {
      throw new Error("E-mail inválido");
    }
    
    const passwordErrors = this.validatePassword(password);
    if (passwordErrors.length > 0) {
      throw new Error(`'Senha inválida: A senha deve ter ${passwordErrors.join(", ")}`);
    }

    const user = await this.repository.save({ name, email, password });
    return user;
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
}
