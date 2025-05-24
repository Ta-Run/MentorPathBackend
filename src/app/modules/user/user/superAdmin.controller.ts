import { Request, Response, NextFunction } from 'express';
import { KrvError, KrvResult, JWT } from '../../../utils';
import { Dal as SuperAdminDal } from '../../shared/dals/superAdmin.dal';
import { Dal as Client } from '../../shared/dals/user.dal';
import { ILoginSuperAdmin, ISuperAdmin, IRegisterSuperAdmin } from '../../shared/interfaces/superadmin.interface';
import { SuperAdmin } from '../../shared/models/superadmin.model';
import { hash, compare, genSalt } from 'bcrypt';
import { Dal as AccountantDal } from '../../shared/dals/accountant.dal';
import { IAccountantAdmin } from '../../shared/interfaces/accountant.interface';
import { AccountantAdmin } from '../../shared/models/accountantAdmin.model';


export class SuperAdminController {


  /**
 * Fetch Client Data.
 * @param req - Express request object
 * @returns Promise resolving to klvResult with SuperAdmin data
 */
  async registerSuperAdmin(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const {
        name,
        email,
        password,
        phone,
        isEmail,
      }: IRegisterSuperAdmin = req.body;

      if (!name || !email || !password) {
        throw new KrvError(401, 'Missing Parameters');
      }

      const isValidEmail = /\S+@\S+\.\S+/;

      if (!isValidEmail) {
        throw new KrvError(401, 'Enter valid email');
      }

      const superAdminEmail: ISuperAdmin = await SuperAdminDal.findSuperAdminByEmail(email);

      if (superAdminEmail) {
        throw new KrvError(401, 'Email already registered');
      }

      const salt = await genSalt(8);

      const passwordHash = await hash(password, salt);
      const superAdminData: ISuperAdmin = new SuperAdmin({
        name,
        email,
        password: passwordHash,
        active: true,
        phone,
        isEmail,
      });
      const superAdmin: any = await SuperAdminDal.createSuperAdmin(superAdminData);

      const token = await JWT.createToken(superAdmin._id);
      const result = new KrvResult(200, 'Super Admin signup successful!', {
        token,
        superAdmin
      });
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof KrvError) {
        next(new KrvError(error.status, error.message));
      } else {
        next(new KrvError(500, "Unexpected error occurred"));
      }
    }
  }


  async login(req: Request, res: Response, next: NextFunction): Promise<any> {

    try {
      const { email, password }: ILoginSuperAdmin = req.body;
      if (!email || !password) {
        throw new KrvError(401, 'Email and Password both are required.');
      }

      const superAdmin: ISuperAdmin = await SuperAdminDal.findSuperAdminByEmail(email);
      if (!superAdmin) {
        throw new KrvError(401, 'Email is not registered');
      }

      const superAdminPassword: string = superAdmin?.password as string;
      const checkPassword = await compare(password, superAdminPassword);
      if (!checkPassword) {
        throw new KrvError(403, 'Incorrect password');
      }
      if (!superAdmin.active) {
        throw new KrvError(401, 'Superadmin is blocked');
      }
      const superAdminData = {
        lastLogin: Date.now()
      };
      await SuperAdminDal.updateClientById(String(superAdmin._id), superAdminData);

      const token = await JWT.createToken(String(superAdmin._id));

      const result = new KrvResult(200, 'Login Successful', {
        token,
        superAdmin
      });
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof KrvError) {
        next(new KrvError(error.status, error.message));
      } else {
        next(new KrvError(500, "Unexpected error occurred"));
      }
    }
  }


  async inviteAccountant(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const {
        email,
        name,
        businessDetails
      }: IAccountantAdmin = req.body;

      if (!email || !name || !businessDetails) {
        throw new KrvError(401, 'Missing Parameters');
      }

      let accountantDetails;
      let updateAccountantDetails;

      const accountantAdmin: IAccountantAdmin = await AccountantDal.findAccountantByEmail(email);

      let accountant: IAccountantAdmin = new AccountantAdmin({
        name,
        email,
        business: businessDetails
      });

      if (accountantAdmin) {

        updateAccountantDetails = await AccountantDal.updateAccountBusiness(accountant);
      } else {
        accountantDetails = await AccountantDal.inviteAccountantByEmail(accountant);
      }

      const result = updateAccountantDetails ? new KrvResult(200, 'Details Update and Invitation Send Successfully', updateAccountantDetails) : new KrvResult(200, ' Invitation Send Successfully', accountantDetails)
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof KrvError) {
        next(new KrvError(error.status, error.message));
      } else {
        next(new KrvError(500, "Unexpected error occurred"));
      }
    }
  }





}

export const SuperAdminPanelController = new SuperAdminController();

