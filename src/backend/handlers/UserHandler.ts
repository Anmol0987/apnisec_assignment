import { NextResponse } from "next/server";
import { UserService } from "../services/UserService";
import { AppError } from "../errors/AppError";

export class Userhandler {
  private userService = new UserService();

  async getProfile(userId: string) {
    try {
      const user = await this.userService.getProfile(userId);
      return NextResponse.json({ user });
    } catch (err) {
        return this.handleError(err);
      }
  }

  async updateProfile(req: Request, userId: string) {
    try {
      const body = await req.json();
      const user = await this.userService.updateProfile(userId, body);
      return NextResponse.json({ user });
    } catch (err) {
        return this.handleError(err);
      }
  }

  private handleError(error:any){
    if(error instanceof AppError){
        return NextResponse.json(
            {error:error.message},
        {status:error.statusCode})
    }
    return NextResponse.json({error:"Internal Server Error"},{status:500})
  }
}
