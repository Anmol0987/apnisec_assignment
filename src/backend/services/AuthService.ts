import { AuthError } from "../errors/AuthError";
import { ValidationError } from "../errors/ValidationError";
import { UserRepository } from "../repositories/UserRepository";
import { Bcrypt } from "../utils/bcrypt";
import { JwtUtil } from "../utils/jwt";
import { EmailService } from "./EmailService";

export class AuthService {
  private userRepo = new UserRepository();
  private emailService = new EmailService();
  async register(data: { name: string; email: string; password: string }) {
    if (!data.email || !data.password || !data.name) {
      throw new ValidationError("All fields are required");
    }

    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) {
      throw new ValidationError("Email already registered");
    }

    const hashedPassword = await Bcrypt.hash(data.password);

    const user = await this.userRepo.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    const token = JwtUtil.generateToken(user.id);
    await this.emailService.sendWelcomeEmail(user.email,user.name)
    return { user , token };
  }

  async login(data: { email: string; password: string }) {
    if (!data.email || !data.password) {
      throw new ValidationError("Email and password required");
    }
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) throw new AuthError("Invalid credentials");

    const valid = await Bcrypt.compare(data.password, user.password);
    if (!valid) throw new AuthError("Invalid credentials");

    const token = JwtUtil.generateToken(user.id);

    return { user, token };
  }

  async me(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new AuthError("User not found");

    return user;
  }
}
