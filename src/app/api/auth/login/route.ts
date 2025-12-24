import { AuthHandler } from "@/backend/handlers/AuthHandler";

export async function POST(req:Request){
    return new AuthHandler().login(req)
}