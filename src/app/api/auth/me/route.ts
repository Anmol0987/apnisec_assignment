import { AuthHandler } from "@/backend/handlers/AuthHandler";
import { AuthMiddleware } from "@/backend/middlewares/AuthMiddleware";

export async function GET(req:Request){
    console.log("inside function")
    const userId = AuthMiddleware.authenticate(req);
    return new AuthHandler().me(userId)
}