import express from 'express';
import userRouter from './modules/user/userRoutes';
import videoRouter from './modules/video/videoRoutes'
import progessRouter from './modules/progress/progressRoutes'
const router = express.Router();
router.use('/user', userRouter);
router.use('/video', videoRouter);
router.use('/progess', progessRouter);


export default router;
