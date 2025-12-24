import { prisma } from "@/lib/prisma";
import { IssuePriority, IssueStatus, IssueType } from "@prisma/client";

export class IssueRepository {
  async create(data: {
    title: string;
    description: string;
    type: IssueType;
    priority?: IssuePriority;
    status?: IssueStatus;
    userId: string;
  }) {
    return await prisma.issue.create({ data });
  }

  async findAllByUser(userId: string, type?: IssueType) {
    return await prisma.issue.findMany({
      where: { userId, ...(type ? { type } : {}) },
      orderBy: { createdAt: "desc" },
    });
  }
  async findById(id: string, userId: string) {
    return prisma.issue.findFirst({
      where: { id, userId },
    });
  }
  async update(
    id: string,
    userId: string,
    data: {
      title?: string;
      description?: string;
      status?: IssueStatus;
      priority?: IssuePriority;
    }
  ) {
    return await prisma.issue.update({ where: { id, userId }, data });
  }

  async delete(id: string, userId: string) {
    return await prisma.issue.delete({ where: { id, userId } });
  }
}
