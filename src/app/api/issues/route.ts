import { IssueHandler } from "@/backend/handlers/IssueHandler";
import { AuthMiddleware } from "@/backend/middlewares/AuthMiddleware";

export async function GET(req: Request) {
  const userId = AuthMiddleware.authenticate(req);
  return new IssueHandler().listAllIssues(req, userId);
}

export async function POST(req: Request) {
    console.log("inisde post")
  const userId = AuthMiddleware.authenticate(req);
  return new IssueHandler().create(req, userId);
}