import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { UserDbInterface } from '../../application/repositories/userDbRepository';
import { UserRepositoryMongoDB } from '../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB';
import { AuthService } from '../../frameworks/services/authService';
import { AuthServiceInterface } from '../../application/services/authServiceInterface';
import { recruiterInterface } from '../../types/recruiterInterface';
import { CreateUserInterface } from '../../types/userInterface';
import { recruiterDB } from '../../frameworks/database/mongoDb/repositories/recruiterDB';
import { RecruiterDbInterface } from '../../application/repositories/recruiterDbInterface';
import { GoogleUserInteface } from '../../types/googleUserInterface';
import { googleUserLogin } from '../../application/use-cases/auth/userAuth';
import { userProfileDb } from '../../frameworks/database/mongoDb/repositories/userProfile';
import { profileDbInterface } from '../../application/repositories/userProfileInterface';
import { recProfileDbInterface } from '../../application/repositories/recruiterProfileInterface';
import { recProfileDb } from '../../frameworks/database/mongoDb/repositories/recruiterProfile';
import { recruiterDetails } from '../../application/use-cases/auth/userAuth';
import { userDetails } from '../../application/use-cases/auth/userAuth';

import {
  userRegister,
  userLogin,
  recruiterLogin,
  recruiterRegister,
} from '../../application/use-cases/auth/userAuth';
import { Types } from 'mongoose';

const authController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB,
  recruiterDBImpl: recruiterDB,
  recruiterDBInterface: RecruiterDbInterface,
  userProfileInterface: profileDbInterface,
  profileImplDb: userProfileDb,
  recProfileInterface: recProfileDbInterface,
  recProfileImpl: recProfileDb
  // googleAuthService: GoogleAuthService,
  // googleAuthServiceInterface: GoogleAuthServiceInterface
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const dbRepositoryRecruiter = recruiterDBInterface(recruiterDBImpl());
  const dbRepositoryProfile = userProfileInterface(profileImplDb());
  const dbRepositoryRecProfile = recProfileInterface(recProfileImpl());
  // const googleAuthServices = googleAuthServiceInterface(googleAuthService());

  const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const user: CreateUserInterface = req.body;
    const { token, profile, applicantId } = await userRegister(
      user,
      dbRepositoryUser,
      dbRepositoryProfile,
      authService
    );
    res.json({
      status: 'success',
      message: 'new user registered',
      token,
      profile,
      applicantId,
    });
  });
  const registerRecruiter = asyncHandler(
    async (req: Request, res: Response) => {
      const recruiter: recruiterInterface = req.body;
      const { token, profile, recruiterData } = await recruiterRegister(
        recruiter,
        dbRepositoryRecruiter,
        authService,
        dbRepositoryRecProfile
      );
      res.json({
        status: 'success',
        message: 'new recruiter registered',
        token,
        profile,
        recruiterData,
      });
    }
  );

  const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const token = await userLogin(
      email,
      password,
      dbRepositoryUser,
      authService
    );
    res.json({
      status: 'success',
      message: 'user verified',
      token,
    });
  });

  const loginWithGoogle = asyncHandler(async (req: Request, res: Response) => {
    const userDetails: GoogleUserInteface | any = req.body;
    const user: any = {
      firstName: userDetails?._tokenResponse?.firstName,
      lastName: userDetails?._tokenResponse?.lastName,
      email: userDetails?._tokenResponse?.email,
    };

    const result: any = await googleUserLogin(
      user,
      dbRepositoryUser,
      dbRepositoryProfile,
      authService
    );
    console.log(result, 'login-gogggggle');

    const token: string = result?.token;

    const profile: string = result?.profile;
    const applicantId: Types.ObjectId = result?.applicantId;
    console.log(applicantId, 'apppppppppp');
    res.json({
      status: 'success',
      message: 'user verified',
      token,
      applicantId,
      profile,
    });
  });

  const loginRecruiter = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const { token, recruiterData } = await recruiterLogin(
      email,
      password,
      dbRepositoryRecruiter,
      authService
    );
    res.json({
      status: 'success',
      message: 'recruiter verified',
      token,
      recruiterData,
    });
  });

  //get details

  const getDetails = asyncHandler(async (req: Request, res: Response) => {
    const { recId } = req.params;
    const recDetails: any = await recruiterDetails(
      recId,
      dbRepositoryRecruiter
    );
    res.json({
      status: 'success',
      message: 'fetched recruiter data successfully',
      recDetails,
    });
  });
  const getUserDetails = asyncHandler(async (req: Request, res: Response) => {
    const { userProfId } = req.params;
    const userProfile: any = await userDetails(userProfId, dbRepositoryUser);
    console.log(userProfile, 'prooooo');

    res.json({
      status: 'success',
      message: 'fetched job seeker data successfully',
      userProfile,
    });
  });

  return {
    registerUser,
    registerRecruiter,
    getDetails,
    getUserDetails,
    loginUser,
    loginRecruiter,
    loginWithGoogle,
  };
};

export default authController;
