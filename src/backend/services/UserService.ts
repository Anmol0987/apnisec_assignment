import { AuthError } from "../errors/AuthError";
import { ValidationError } from "../errors/ValidationError";
import { UserRepository } from "../repositories/UserRepository";
import { EmailService } from "./EmailService";

export class UserService {
  private userRepo = new UserRepository();
  private emailService = new EmailService();
  async getProfile(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new AuthError("User not found");

    return user;
  }

  async updateProfile(userId: string, data: { name: string }) {
    if (!data.name) {
      throw new ValidationError("Nothing to update");
    }

    const updated = await this.userRepo.updateProfile(userId, {
      name: data.name,
    });

    await this.emailService.sendProfileUpdatedEmail(
      updated.email,
      updated.name
    );

    return updated;
  }
}
