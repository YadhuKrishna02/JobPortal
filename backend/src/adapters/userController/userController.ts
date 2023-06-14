import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { UserProfileInterface } from '../../types/userProfileInterface';
import { userProfileDb } from '../../frameworks/database/mongoDB/repositories/userProfile';
import { profileDbInterface } from '../../application/repositories/userProfileInterface';
import { EditProfile } from '../../application/use-cases/job-seeker/editProfile';
import { CreateProfile } from '../../application/use-cases/job-seeker/editProfile';
import { applicantDbInterface } from '../../application/repositories/applicantDbInterface';
import { applicantDB } from '../../frameworks/database/mongoDB/repositories/applicantDB';
import { ApplyJob } from '../../application/use-cases/job/job';
import { AppliedJobs } from '../../application/use-cases/job-seeker/editProfile';
import cloudinary from 'cloudinary';
import fs from 'fs';
import mongoose, { Types } from 'mongoose';

const userController = (
  userProfileInterface: profileDbInterface,
  profileImplInterface: userProfileDb,
  applicantInterface: applicantDbInterface,
  applicantDB: applicantDB
) => {
  const dbRepositoryProfile = userProfileInterface(profileImplInterface());
  const applicantRepository = applicantInterface(applicantDB());

  //add profile

  const addProfile = asyncHandler(async (req: Request, res: Response) => {
    const profileData: UserProfileInterface = req.body;

    const createdProfile = await CreateProfile(
      profileData,
      dbRepositoryProfile
    );
    res.json({
      createdProfile,
      status: 'success',
      message: 'profile created successfully',
    });
  });

  //edit profile
  const editProfile = asyncHandler(async (req: Request, res: Response) => {
    const editedData: UserProfileInterface = req.body;

    const file: string | any = req?.file?.path;
    console.log(file, 'fileeeeee');

    const { id } = req.params;
    const editedProfile = await EditProfile(
      id,
      editedData,
      dbRepositoryProfile,
      file
    );
    res.json({
      editedProfile,
      status: 'success',
      message: 'profile edited successfully',
    });
  });

  //apply job

  const applyJob = asyncHandler(async (req: Request, res: Response) => {
    const { applicantId }: any = req.query;
    const { jobId }: any = req.query;

    const jobApply = await ApplyJob(applicantId, jobId, applicantRepository);
    console.log(jobApply, 'kokok');
    res.json({
      status: 'success',
      message: 'job applied successfully',
    });
  });

  const getAppliedJobs = asyncHandler(async (req: Request, res: Response) => {
    const { profileId } = req.params;

    const jobs = await AppliedJobs(profileId, dbRepositoryProfile);
    res.json({
      status: 'success',
      message: 'jobs fetched successfully',
      jobs,
    });
  });

  return {
    editProfile,
    addProfile,
    applyJob,
    getAppliedJobs,
  };
};

export default userController;
