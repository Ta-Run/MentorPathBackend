import express from 'express';
import { ProgressPanelRouter } from './progress';

const progessRouter = express.Router();

progessRouter.use('/', ProgressPanelRouter);

export default progessRouter;
