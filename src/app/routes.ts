import express from 'express';
import userRouter from './modules/user/userRoutes';

const router = express.Router();
router.use('/user', userRouter);
export default router;
