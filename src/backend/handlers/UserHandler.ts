import { NextResponse } from "next/server";
import { UserService } from "../services/UserService";

export class Userhandler {
  private userService = new UserService();

  async getProfile(userId: string) {
    try {
      const user = await this.userService.getProfile(userId);
      return NextResponse.json({ user });
    } catch (err) {
      return err;
    }
  }

  async updateProfile(req: Request, userId: string) {
    try {
      const body = await req.json();
      const user = await this.userService.updateProfile(userId, body);
      return NextResponse.json({ user });
    } catch (err) {
      return err;
    }
  }
}
