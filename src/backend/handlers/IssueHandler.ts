import { NextResponse } from "next/server";
import { IssueService } from "../services/IssueService";
import { IssueType } from "@prisma/client";

export class IssueHandler {
  private issueService = new IssueService();

  async listAllIssues(req: Request, userId: string) {
    try {
      const { searchParams } = new URL(req.url);
      const typeParam = searchParams.get("type");

      const type = typeParam
        ? (typeParam.toUpperCase().replace("-", "_") as IssueType)
        : undefined;

      const issues = await this.issueService.getIssues(userId, type);
      return NextResponse.json({ issues });
    } catch (err) {
      return err;
    }
  }

  async create(req: Request, userId: string) {
    try {
        const body = await req.json();
        console.log (" handler body",body);
        const issue = await this.issueService.createIssue(userId, body);
        console.log (" handler issue",issue);
      return NextResponse.json({ issue });
    } catch (err) {
      return err;
    }
  }

  async getOne(userId: string, issueId: string) {
    try {
      const issue = await this.issueService.getIssueById(userId, issueId);
      return NextResponse.json({ issue });
    } catch (err) {
      return err;
    }
  }

  async update(req: Request, userId: string, issueId: string) {
    try {
      const body = await req.json();
      const issue = await this.issueService.updateIssue(userId, issueId, body);
      return NextResponse.json({ issue });
    } catch (err) {
      return err;
    }
  }

  async delete(userId: string, issueId: string) {
    try {
      await this.issueService.deleteIssue(userId, issueId);
      return NextResponse.json({ message: "Issue deleted" });
    } catch (err) {
      return err;
    }
  }
}
