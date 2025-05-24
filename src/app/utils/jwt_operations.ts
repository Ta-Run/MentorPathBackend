import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
import { KrvError} from '../utils/index';

const secret:any = process.env.jwt_token;
const tokenExpiryTime=process.env.token_expiry_time;
const emailTokenExpiryTime=process.env.email_token_expiry_time;

if (!secret) {
  throw new Error("JWT secret is not defined in the environment variables.");
}

class JWTClass {
  async createToken(id: string): Promise<string> {
    try {
      const token = jwt.sign({ id }, secret, { expiresIn: tokenExpiryTime });
      return token;
    } catch (error:any) {
      throw new KrvError(error?.status,`Error creating token: ${error?.message}`);
    }
  }

  async verifyToken(token: string): Promise<{ id: string }> {
    try {
      const decoded = jwt.verify(token, secret) as { id: string };
      return decoded;
    } catch (error:any) {
      throw new KrvError(error?.status,`Invalid or expired token: ${error?.message}`);
    }
  }

  async createEmailVerifyToken(id: string, role: string): Promise<string> {
    try {
      const token = jwt.sign({ id, role }, secret, { expiresIn: emailTokenExpiryTime });
      return token;
    } catch (error:any) {
      throw new KrvError(error?.status,`Error creating email verification token: ${error.message}`);
    }
  }
}

export const JWT = new JWTClass();

