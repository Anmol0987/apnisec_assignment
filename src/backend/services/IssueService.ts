import { IssuePriority, IssueStatus, IssueType } from "@prisma/client";
import { IssueRepository } from "../repositories/IssuesRepository";

export class IssueService{
    private issueRepo=new IssueRepository()


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
      throw new Error("Required fields missing");
    }
    console.log("inside service")
    return await this.issueRepo.create({
      ...data,
      userId,
    });
  }

  async getIssues(userId: string, type?: IssueType) {
    return this.issueRepo.findAllByUser(userId, type);
  }

  async getIssueById(userId: string, issueId: string) {
    const issue = await this.issueRepo.findById(issueId, userId);
    if (!issue) throw new Error("Issue not found");
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
    if (!existing) throw new Error("Issue not found");

    return this.issueRepo.update(issueId, userId, data);
  }

  async deleteIssue(userId: string, issueId: string) {
    const existing = await this.issueRepo.findById(issueId, userId);
    if (!existing) throw new Error("Issue not found");

    await this.issueRepo.delete(issueId, userId);
  }
}