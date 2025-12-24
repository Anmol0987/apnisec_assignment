import { AuthHandler } from "@/backend/handlers/AuthHandler";
import { AuthMiddleware } from "@/backend/middlewares/AuthMiddleware";
import { RateLimitMiddleWare } from "@/backend/middlewares/RateLimitMiddleware";

export async function GET(req: Request) {
  RateLimitMiddleWare.enforce(req);

  const userId = AuthMiddleware.authenticate(req);
  return new AuthHandler().me(userId);
}
