import express from 'express';
import { VideoPanelRouter } from './video';

const videoRouter = express.Router();

videoRouter.use('/', VideoPanelRouter);

export default videoRouter;
