import { IssueHandler } from "@/backend/handlers/IssueHandler";
import { AuthMiddleware } from "@/backend/middlewares/AuthMiddleware";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Params) {
  const { id } = await params;
  const userId = AuthMiddleware.authenticate(req);
  return new IssueHandler().getOne(userId, id);
}

export async function PUT(req: Request, { params }: Params) {
  const userId = AuthMiddleware.authenticate(req);
  const { id } = await params;

  return new IssueHandler().update(req, userId, id);
}

export async function DELETE(req: Request, { params }: Params) {
  const userId = AuthMiddleware.authenticate(req);
  const { id } = await params;

  return new IssueHandler().delete(userId, id);
}
