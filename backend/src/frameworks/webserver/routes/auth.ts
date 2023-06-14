import express from 'express';
import authController from '../../../adapters/authController/authController';
import { userDbRepository } from '../../../application/repositories/userDbRepository';
import { authServiceInterface } from '../../../application/services/authServiceInterface';
import { userRepositoryMongoDB } from '../../database/mongoDb/repositories/userRepositoryMongoDB';
import { authService } from '../../services/authService';
import { recruiterDbInterface } from '../../../application/repositories/recruiterDbInterface';
import { recruiterDB } from '../../database/mongoDB/repositories/recruiterDB';
import { userProfileDb } from '../../database/mongoDB/repositories/userProfile';
import { profileDbInterface } from '../../../application/repositories/userProfileInterface';

const authRouter = () => {
  const router = express.Router();

  const controller = authController(
    authServiceInterface,
    authService,
    userDbRepository,
    userRepositoryMongoDB,
    recruiterDB,
    recruiterDbInterface,
    profileDbInterface,
    userProfileDb
  );

  router.post('/signup', controller.registerUser);

  router.post('/recruiter/signup', controller.registerRecruiter);

  router.post('/login', controller.loginUser);

  router.post('/recruiter/login', controller.loginRecruiter);

  router.post('/sign-in-with-google', controller.loginWithGoogle);

  return router;
};

export default authRouter;
