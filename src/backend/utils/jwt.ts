import jwt from "jsonwebtoken";
export class JwtUtil {
  static generateToken(userId: string) {
    return jwt.sign({userId},process.env.JWT_SECRET!,{expiresIn:"30m"})
  }
  static verifyToken(token: string) {
    return jwt.verify(token,process.env.JWT_SECRET!) as {userId:string};
  }
}
