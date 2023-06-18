import { Application } from 'express';
import authRouter from './auth';
import recruiterRouter from './recruiter';
import userRouter from './job-seeker';
import chatRouter from './chat';
import messageRouter from './message';
import recruiterAuthMiddleware from '../middlewares/authMiddleware';

const routes = (app: Application) => {
  app.use('/api/auth', authRouter());
  app.use('/api/', userRouter());
  app.use('/api/recruiter', recruiterAuthMiddleware, recruiterRouter());
  app.use('/api/chat', chatRouter());
  app.use('/api/message', messageRouter());
};

export default routes;
