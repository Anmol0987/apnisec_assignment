import { AuthHandler } from "@/backend/handlers/AuthHandler";
import { RateLimitMiddleWare } from "@/backend/middlewares/RateLimitMiddleware";

export async function POST(req: Request) {
  RateLimitMiddleWare.enforce(req);

  return new AuthHandler().register(req);
}
