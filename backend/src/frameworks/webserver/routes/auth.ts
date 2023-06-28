import express from 'express';
import authController from '../../../adapters/authController/authController';
import { userDbRepository } from '../../../application/repositories/userDbRepository';
import { authServiceInterface } from '../../../application/services/authServiceInterface';
import { userRepositoryMongoDB } from '../../database/mongoDb/repositories/userRepositoryMongoDB';
import { authService } from '../../services/authService';
import { recruiterDbInterface } from '../../../application/repositories/recruiterDbInterface';
import { recruiterDB } from '../../database/mongoDb/repositories/recruiterDB';
import { userProfileDb } from '../../database/mongoDb/repositories/userProfile';
import { profileDbInterface } from '../../../application/repositories/userProfileInterface';
import { recProfileDbInterface } from '../../../application/repositories/recruiterProfileInterface';
import { recProfileDb } from '../../database/mongoDb/repositories/recruiterProfile';

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
    userProfileDb,
    recProfileDbInterface,
    recProfileDb
  );

  router.post('/signup', controller.registerUser);

  router.post('/recruiter/signup', controller.registerRecruiter);

  router.get('/recruiter_details/:recId', controller.getDetails);

  router.get('/job_seeker_details/:userProfId', controller.getUserDetails);

  router.post('/login', controller.loginUser);

  router.post('/recruiter/login', controller.loginRecruiter);

  router.post('/sign-in-with-google', controller.loginWithGoogle);

  return router;
};

export default authRouter;
