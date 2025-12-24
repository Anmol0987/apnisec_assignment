import { IssuePriority, IssueStatus, IssueType } from "@prisma/client";
import { IssueRepository } from "../repositories/IssuesRepository";
import { ValidationError } from "../errors/ValidationError";
import { AuthError } from "../errors/AuthError";
import { UserRepository } from "../repositories/UserRepository";
import { EmailService } from "./EmailService";

export class IssueService {
  private issueRepo = new IssueRepository();
  private userRepo = new UserRepository();
  private emailRepo = new EmailService();

  async createIssue(
    userId: string,
    data: {
      title: string;
      description: string;
      type: IssueType;
      priority?: IssuePriority;
      status?: IssueStatus;
    }
  ) {
    if (!data.title || !data.description || !data.type) {
      throw new ValidationError("Required fields missing");
    }
    const issue = await this.issueRepo.create({
      ...data,
      userId,
    });

    const user = await this.userRepo.findById(userId);
    if (user) {
      await this.emailRepo.sendIssueCreatedEmail(user.email, {
        title: issue.title,
        description: issue.description,
        type: issue.type,
      });
    }
    return issue;
  }

  async getIssues(userId: string, type?: IssueType) {
    return this.issueRepo.findAllByUser(userId, type);
  }

  async getIssueById(userId: string, issueId: string) {
    const issue = await this.issueRepo.findById(issueId, userId);
    if (!issue) throw new AuthError("Issue not found");
    return issue;
  }

  async updateIssue(
    userId: string,
    issueId: string,
    data: {
      title?: string;
      description?: string;
      status?: IssueStatus;
      priority?: IssuePriority;
    }
  ) {
    const existing = await this.issueRepo.findById(issueId, userId);
    if (!existing) throw new AuthError("Issue not found");

    return this.issueRepo.update(issueId, userId, data);
  }

  async deleteIssue(userId: string, issueId: string) {
    const existing = await this.issueRepo.findById(issueId, userId);
    if (!existing) throw new AuthError("Issue not found");

    await this.issueRepo.delete(issueId, userId);
  }
}
