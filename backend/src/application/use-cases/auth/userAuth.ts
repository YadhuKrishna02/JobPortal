import { HttpStatus } from '../../../types/httpStatus';
import { CreateUserInterface } from '../../../types/userInterface';
import { recruiterInterface } from '../../../types/recruiterInterface';
import { AuthServiceInterface } from '../../services/authServiceInterface';
import AppError from '../../../utils/appError';
import {
  UserDbInterface,
  userDbRepository,
} from '../../repositories/userDbRepository';
import { RecruiterDbInterface } from '../../repositories/recruiterDbInterface';
import { profileDbInterface } from '../../repositories/userProfileInterface';
import { GoogleUserInteface } from '../../../types/googleUserInterface';
import { userRepositoryMongoDB } from '../../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB';
import { ObjectId, Types } from 'mongoose';

export const userRegister = async (
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: Number;
    password: string;
  },
  userRepository: ReturnType<UserDbInterface>,
  dbRepositoryProfile: ReturnType<profileDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  user.email = user.email.toLowerCase();
  const isExistingEmail = await userRepository.getUserByEmail(user.email);
  if (isExistingEmail) {
    throw new AppError('existing email', HttpStatus.UNAUTHORIZED);
  }

  user.password = await authService.encryptPassword(user.password);

  const profile: any = await dbRepositoryProfile.addProfile(user);
  const createdUser: any = await userRepository.addUser(user, profile._id);

  const applicantId: Types.ObjectId = createdUser._id;

  const token = authService.generateToken(createdUser._id.toString());
  return { token, profile, applicantId };
};

export const recruiterRegister = async (
  recruiter: {
    _id: string;
    companyName: string;
    userName: string;
    email: string;
    password: string;
  },
  recruiterRepository: ReturnType<RecruiterDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  recruiter.email = recruiter.email.toLowerCase();
  const isExistingEmail = await recruiterRepository.getRecruiterByMail(
    recruiter.email
  );
  if (isExistingEmail) {
    throw new AppError('existing email', HttpStatus.UNAUTHORIZED);
  }

  const existingRecruiter = await recruiterRepository.getRecruiterByName(
    recruiter.userName
  );

  if (existingRecruiter) {
    throw new AppError('existing recruiter', HttpStatus.UNAUTHORIZED);
  }
  recruiter.password = await authService.encryptPassword(recruiter.password);
  const recruiterData: any = await recruiterRepository.addRecruiter(recruiter);
  const token = authService.generateToken(recruiterData._id.toString());
  return { token, recruiterData };
};

export const userLogin = async (
  email: string,
  password: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user: CreateUserInterface | null = await userRepository.getUserByEmail(
    email
  );

  if (!user) {
    throw new AppError("this user doesn't exist", HttpStatus.UNAUTHORIZED);
  }
  const isPasswordCorrect = await authService.comparePassword(
    password,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new AppError(
      'Sorry, your password was incorrect. Please double-check your password',
      HttpStatus.UNAUTHORIZED
    );
  }
  const token = authService.generateToken(user._id.toString());
  return token;
};

export const googleUserLogin = async (
  user: {
    firstName: string;
    lastName: string;
    email: string;
  },
  userRepository: ReturnType<UserDbInterface>,
  dbRepositoryProfile: ReturnType<profileDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const isExistingEmail = await userRepository.getUserByEmail(user.email);
  if (isExistingEmail) {
    const token = authService.generateToken(isExistingEmail._id.toString());

    return token;
  } else {
    const profile: any = await dbRepositoryProfile.addProfile(user);
    const createdUser = await userRepository.addUser(user, profile._id);
    const applicantId = createdUser._id;
    const token: string = authService.generateToken(createdUser._id.toString());

    return { token, profile, applicantId };
  }
};
export const recruiterLogin = async (
  email: string,
  password: string,
  recruiterRepository: ReturnType<RecruiterDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const recruiter: recruiterInterface | null =
    await recruiterRepository.getRecruiterByMail(email);
  if (!recruiter) {
    throw new AppError("this user doesn't exist", HttpStatus.UNAUTHORIZED);
  }
  const isPasswordCorrect = await authService.comparePassword(
    password,
    recruiter.password
  );
  if (!isPasswordCorrect) {
    throw new AppError(
      'Sorry, your password was incorrect. Please double-check your password',
      HttpStatus.UNAUTHORIZED
    );
  }
  const token = authService.generateToken(recruiter._id.toString());
  return token;
};
