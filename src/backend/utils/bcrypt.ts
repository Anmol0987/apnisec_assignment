import bcrypt from "bcryptjs";

export class Bcrypt {
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async compare(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
}
