import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
import { MentorError } from '../utils/index';

const secret: any = process.env.jwt_token;
const tokenExpiryTime: any = process.env.token_expiry_time || "1h";


if (!secret) {
  throw new Error("JWT secret is not defined in the environment variables.");
}

class JWTClass {
  async createToken(id: string): Promise<string> {
    try {
      const token = jwt.sign({ id }, secret, { expiresIn: tokenExpiryTime });
      return token;
    } catch (error: any) {
      throw new MentorError(error?.status, `Error creating token: ${error?.message}`);
    }
  }

  async verifyToken(token: string): Promise<{ id: string }> {
    try {
      const decoded = jwt.verify(token, secret) as { id: string };
      return decoded;
    } catch (error: any) {
      throw new MentorError(error?.status, `Invalid or expired token: ${error?.message}`);
    }
  }


}

export const JWT = new JWTClass();

