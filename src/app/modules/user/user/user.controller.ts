import { Request, Response, NextFunction } from 'express';
import { MentorError, MentorResult, JWT } from '../../../utils';

import { Dal as UserDal } from '../../shared/dals/user.dal';
import { IUser } from '../../shared/interfaces/user.interface'
import { User } from '../../shared/models/user.model';
import { hash, compare, genSalt } from 'bcrypt';



export class UserController {


  /**
 * Fetch Client Data.
 * @param req - Express request object
 * @returns Promise resolving to klvResult with SuperAdmin data
 */
  async registerUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const {
        name,
        email,
        password,

      }: IUser = req.body;

      if (!name || !email || !password) {
        throw new MentorError(401, 'Missing Parameters');
      }

      const isValidEmail = /\S+@\S+\.\S+/;

      if (!isValidEmail) {
        throw new MentorError(401, 'Enter valid email');
      }

      const userEmail: IUser = await UserDal.findUserByEmail(email);

      if (userEmail) {
        throw new MentorError(401, 'Email already registered');
      }

      const salt = await genSalt(8);

      const passwordHash = await hash(password, salt);
      const UserData: IUser = new User({
        name,
        email,
        password: passwordHash

      });
      const user: any = await UserDal.createUser(UserData);

      const token = await JWT.createToken(user._id);
      const result = new MentorResult(200, 'User signup successful!', {
        token,
        user
      });
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof MentorError) {
        next(new MentorError(error.status, error.message));
      } else {
        next(new MentorError(500, "Unexpected error occurred"));
      }
    }
  }


  async login(req: Request, res: Response, next: NextFunction): Promise<any> {

    try {
      const { email, password }: IUser = req.body;
      if (!email || !password) {
        throw new MentorError(401, 'Email and Password both are required.');
      }

      const superAdmin: IUser = await UserDal.findUserByEmail(email);
      if (!superAdmin) {
        throw new MentorError(401, 'Email is not registered');
      }

      const superAdminPassword: string = superAdmin?.password as string;
      const checkPassword = await compare(password, superAdminPassword);
      if (!checkPassword) {
        throw new MentorError(403, 'Incorrect password');
      }

      const superAdminData = {
        lastLogin: Date.now()
      };
      await UserDal.updateUserById(String(superAdmin._id), superAdminData);

      const token = await JWT.createToken(String(superAdmin._id));

      const result = new MentorResult(200, 'Login Successful', {
        token,
        superAdmin
      });
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof MentorError) {
        next(new MentorError(error.status, error.message));
      } else {
        next(new MentorError(500, "Unexpected error occurred"));
      }
    }
  }

}

export const UserPanelController = new UserController();

