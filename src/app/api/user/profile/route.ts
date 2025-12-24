import { Userhandler } from "@/backend/handlers/UserHandler";
import { AuthMiddleware } from "@/backend/middlewares/AuthMiddleware";
import { RateLimitMiddleWare } from "@/backend/middlewares/RateLimitMiddleware";

export async function GET(req: Request) {
  RateLimitMiddleWare.enforce(req);

  const userId = AuthMiddleware.authenticate(req);
  return new Userhandler().getProfile(userId);
}
export async function PUT(req: Request) {
  RateLimitMiddleWare.enforce(req);

  const userId = AuthMiddleware.authenticate(req);
  return new Userhandler().updateProfile(req, userId);
}
