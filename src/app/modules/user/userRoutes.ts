import express from 'express';
import { UserPanelRouter } from './user';

const userRouter = express.Router();

userRouter.use('/', UserPanelRouter);

export default userRouter;
