import { IssueHandler } from "@/backend/handlers/IssueHandler";
import { AuthMiddleware } from "@/backend/middlewares/AuthMiddleware";
import { RateLimitMiddleWare } from "@/backend/middlewares/RateLimitMiddleware";

export async function GET(req: Request) {
  RateLimitMiddleWare.enforce(req);
  const userId = AuthMiddleware.authenticate(req);
  return new IssueHandler().listAllIssues(req, userId);
}

export async function POST(req: Request) {
  RateLimitMiddleWare.enforce(req);
  const userId = AuthMiddleware.authenticate(req);
  return new IssueHandler().create(req, userId);
}
