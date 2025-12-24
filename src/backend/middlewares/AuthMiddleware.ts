import { JwtUtil } from "../utils/jwt";

export class AuthMiddleware {
  static authenticate(req: Request): string {
    const cookie = req.headers.get("cookie");
    if (!cookie) throw new Error();
    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) throw new Error();

    const payload = JwtUtil.verifyToken(token);

    return payload?.userId;
  }
}
