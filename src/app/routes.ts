import express from 'express';
import userRouter from './modules/user/userRoutes';
import videoRouter from './modules/videoproperty/videoRoutes'
const router = express.Router();
router.use('/user', userRouter);
router.use('/video', videoRouter);

export default router;
