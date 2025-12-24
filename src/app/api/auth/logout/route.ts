import { AuthHandler } from "@/backend/handlers/AuthHandler"

export async function POST(){
    return new AuthHandler().logout()
}