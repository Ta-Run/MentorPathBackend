import express from 'express';
import { SuperAdminPanelRouter } from '../superAdmin/user';
import { SuperAdminCustomerPanelRouter } from '../superAdmin/customer';
import { SuperAdminInvoicePanelRouter } from '../superAdmin/invoice';
import { SuperAdminBillRouter } from '../superAdmin/bills';
import { SuperAdminClientPanelRouter } from '../superAdmin/client';
import { SuperAdminAccountantPanelRouter } from '../superAdmin/accountant';
import { SuperAdminSupportPanelRouter } from './support';
import { SuperAdminBusinessPanelRouter } from './business';


const superAdminRouter = express.Router();

superAdminRouter.use('/', SuperAdminPanelRouter);
superAdminRouter.use('/business', SuperAdminBusinessPanelRouter);
superAdminRouter.use('/client', SuperAdminClientPanelRouter);
superAdminRouter.use('/accountant', SuperAdminAccountantPanelRouter);
superAdminRouter.use('/customer', SuperAdminCustomerPanelRouter);
superAdminRouter.use('/invoice', SuperAdminInvoicePanelRouter);
superAdminRouter.use('/bill', SuperAdminBillRouter);
superAdminRouter.use('/support', SuperAdminSupportPanelRouter);

export default superAdminRouter;
