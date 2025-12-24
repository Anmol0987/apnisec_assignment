import { Userhandler } from "@/backend/handlers/UserHandler";
import { AuthMiddleware } from "@/backend/middlewares/AuthMiddleware";

export async function GET(req: Request) {
  const userId = AuthMiddleware.authenticate(req);
  return new Userhandler().getProfile(userId);
}
export async function PUT(req: Request) {
  const userId = AuthMiddleware.authenticate(req);
  console.log("inside update", userId)
  return new Userhandler().updateProfile(req, userId);
}
