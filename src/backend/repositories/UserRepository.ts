import { prisma } from "@/lib/prisma";

export class UserRepository {
  async create(data: { name: string; email: string; password: string }) {
    return await prisma.user.create({ data });
  }
  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(userId: string) {
    return await prisma.user.findUnique({ where: { id: userId } });
  }

  async updateProfile(userId: string, data: { name: string }) {
    return await prisma.user.update({ where: { id: userId }, data });
  }
}
