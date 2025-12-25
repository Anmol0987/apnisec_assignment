import { NextResponse } from "next/server";
import { AuthService } from "../services/AuthService";
import { AppError } from "../errors/AppError";

export class AuthHandler {
  private authService = new AuthService();

  async register(req: Request) {
    try {
      const body = await req.json();
      const result = await this.authService.register(body);
      const res = NextResponse.json({ user: result.user });
    //   res.cookies.set("token", result.token, {
    //     httpOnly: true,
    //     path: "/",
    //   });
      return res;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async login(req: Request) {
    try {
      const body = await req.json();
      const result = await this.authService.login(body);

      const res = NextResponse.json({ user: result.user });
      res.cookies.set("token", result.token, {
        httpOnly: true,
        path: "/",
      });

      return res;
    } catch (err) {
      return this.handleError(err);
    }
  }
  async logout() {
    const res = NextResponse.json({ message: "Logged out" });
    res.cookies.delete("token");
    return res;
  }
  async me(userId: string) {
    try {
      const user = await this.authService.me(userId);
      return NextResponse.json({ user });
    } catch (err) {
      return this.handleError(err);
    }
  }

  private handleError(error: any) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  
}
