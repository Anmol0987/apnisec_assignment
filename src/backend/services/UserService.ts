import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private userRepo = new UserRepository();

  async getProfile(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    return user;
  }

  async updateProfile(userId: string, data: { name: string }) {
    if (!data.name) {
      throw new Error("Nothing to update");
    }

    const updated = await this.userRepo.updateProfile(userId, {
      name: data.name,
    });
    console.log(updated,"updated service")

    return updated;
  }
}
