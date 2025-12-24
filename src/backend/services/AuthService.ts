import { UserRepository } from "../repositories/UserRepository";
import { Bcrypt } from "../utils/bcrypt";
import { JwtUtil } from "../utils/jwt";

export class AuthService {
  private userRepo = new UserRepository();

  async register(data: { name: string; email: string; password: string }) {
    if (!data.email || !data.password || !data.name) {
      throw new Error("All fields are required");
    }

    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await Bcrypt.hash(data.password);

    const user = await this.userRepo.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const token = JwtUtil.generateToken(user.id);

    return { user, token };
  }

  async login(data: { email: string; password: string }) {
    if (!data.email || !data.password) {
      throw new Error("Email and password required");
    }
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) throw new Error("Invalid credentials");

    const valid = await Bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = JwtUtil.generateToken(user.id);

    return { user, token };
  }

  async me(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    return user;
  }

}
