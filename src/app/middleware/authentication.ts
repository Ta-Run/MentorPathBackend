import { NextFunction, Request, Response } from 'express';
import { KrvError, JWT } from '../utils/index';
import { Dal as Useral } from '../modules/shared/dals/user.dal';
import { ModifyRequest } from '../../../types.d copy';
import { IUser } from '../modules/shared/interfaces/user.interface';
class AuthenticateUser {

  // constructor() {
  //   this.superAdminAuthenticate = this.superAdminAuthenticate.bind(this);
  //   this.clientAuthenticate = this.clientAuthenticate.bind(this);
  // }

  private extractToken(req: Request): string {
    if (!req.headers.authorization) {
      throw new KrvError(400, 'No authorization token is sent with request');
    }
    if (!req.headers.authorization.startsWith('Bearer')) {
      throw new KrvError(400, 'Authorization token should be of Bearer type');
    }
    return req.headers.authorization.split(' ')[1];
  }


  userAuthenticate = async (req: ModifyRequest, res: Response, next: NextFunction) => {
    try {
      const token = this.extractToken(req);
      const id: any = await JWT.verifyToken(token);
      const user: IUser = await Useral.findUserById(id);


      req.user = user;
      next();
    } catch (err) {
      next(new KrvError(401, 'Invalid or expired token'));
    }
  }

}

export const AuthenticateMiddleware = new AuthenticateUser();
