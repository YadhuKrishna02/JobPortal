import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
// import { GoogleAuthService } from '../../frameworks/services/googleAuthService';
// import { GoogleAuthServiceInterface } from '../../application/services/googleAuthServiceInterface';
import { UserDbInterface } from '../../application/repositories/userDbRepository';
import { UserRepositoryMongoDB } from '../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB';
import { AuthService } from '../../frameworks/services/authService';
import { AuthServiceInterface } from '../../application/services/authServiceInterface';
import { recruiterInterface } from '../../types/recruiterInterface';
import { CreateUserInterface } from '../../types/userInterface';
import { recruiterDB } from '../../frameworks/database/mongoDB/repositories/recruiterDB';
import { RecruiterDbInterface } from '../../application/repositories/recruiterDbInterface';
import { GoogleUserInteface } from '../../types/googleUserInterface';
import { googleUserLogin } from '../../application/use-cases/auth/userAuth';
import { userProfileDb } from '../../frameworks/database/mongoDB/repositories/userProfile';
import { profileDbInterface } from '../../application/repositories/userProfileInterface';

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
  profileImplDb: userProfileDb
  // googleAuthService: GoogleAuthService,
  // googleAuthServiceInterface: GoogleAuthServiceInterface
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const dbRepositoryRecruiter = recruiterDBInterface(recruiterDBImpl());
  const dbRepositoryProfile = userProfileInterface(profileImplDb());
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
      const { token, recruiterData } = await recruiterRegister(
        recruiter,
        dbRepositoryRecruiter,
        authService
      );
      console.log(recruiterData, 'reccccccccc');
      res.json({
        status: 'success',
        message: 'new recruiter registered',
        token,
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

    const token: string = result?.token;

    const profile: string = result?.profile;
    const applicantId: Types.ObjectId = result?.applicantId;
    if (result?.token && result?.profile) {
      res.json({
        status: 'success',
        message: 'user verified',
        token,
        profile,
        applicantId,
      });
    } else {
      const token = result;
      res.json({
        status: 'success',
        message: 'user verified',
        token,
      });
    }
  });

  const loginRecruiter = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const token = await recruiterLogin(
      email,
      password,
      dbRepositoryRecruiter,
      authService
    );
    res.json({
      status: 'success',
      message: 'recruiter verified',
      token,
    });
  });

  return {
    registerUser,
    registerRecruiter,
    loginUser,
    loginRecruiter,
    loginWithGoogle,
  };
};

export default authController;
