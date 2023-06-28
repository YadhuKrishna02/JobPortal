import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { UserProfileInterface } from '../../types/userProfileInterface';
import { userProfileDb } from '../../frameworks/database/mongoDb/repositories/userProfile';
import { profileDbInterface } from '../../application/repositories/userProfileInterface';
import { EditProfile } from '../../application/use-cases/job-seeker/editProfile';
import { CreateProfile } from '../../application/use-cases/job-seeker/editProfile';
import { applicantDbInterface } from '../../application/repositories/applicantDbInterface';
import { applicantDB } from '../../frameworks/database/mongoDb/repositories/applicantDB';
import { ApplyJob } from '../../application/use-cases/job/job';
import { AppliedJobs } from '../../application/use-cases/job-seeker/editProfile';
import { JobDbInterface } from '../../application/repositories/jobDbInterface';
import { jobDB } from '../../frameworks/database/mongoDb/repositories/jobDB';
import { FilteredJobs } from '../../application/use-cases/job/job';
import { AllJobs } from '../../application/use-cases/job/job';
import { GetStatus } from '../../application/use-cases/job-seeker/editProfile';
import cloudinary from 'cloudinary';
import fs from 'fs';
import mongoose, { FilterQuery, Types } from 'mongoose';
import { JobInterface } from '../../types/jobInterface';

const userController = (
  userProfileInterface: profileDbInterface,
  profileImplInterface: userProfileDb,
  applicantInterface: applicantDbInterface,
  applicantDB: applicantDB,
  jobDbInterface: JobDbInterface,
  jobDbImpl: jobDB
) => {
  const dbRepositoryProfile = userProfileInterface(profileImplInterface());
  const applicantRepository = applicantInterface(applicantDB());
  const jobRepository = jobDbInterface(jobDbImpl());

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
      jobApply,
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

  //get all jobs

  const allJobs = asyncHandler(async (req: Request, res: Response) => {
    const jobs = await AllJobs(jobRepository);

    res.json({
      status: 'success',
      message: 'jobs fetched successfully',
      jobs,
    });
  });

  //get status
  const getStatus = asyncHandler(async (req: Request, res: Response) => {
    const { applicantId, jobId } = req.query;
    const statusResponse = await GetStatus(
      applicantId,
      jobId,
      dbRepositoryProfile
    );
    console.log(statusResponse, 'rrrrrrr');

    res.json({
      status: 'success',
      message: 'status fetched successfully',
      statusResponse,
    });
  });

  //filtered jobs

  const filteredJobs = asyncHandler(async (req: Request, res: Response) => {
    const { jobLocation, salary, jobTitle } = req.query;
    const query: FilterQuery<JobInterface> = {};
    if (jobLocation) {
      query.jobLocation = jobLocation;
    }

    if (jobTitle) {
      query.jobTitle = jobTitle;
    }

    if (salary) {
      query.salary = { $gte: Number(salary) }; // Assuming salary is a numeric field
    }
    const jobs = await FilteredJobs(query, jobRepository);
    console.log(jobs, 'jooooooooooooo');

    if (jobs.length > 0) {
      res.json({
        jobs,
        status: 'success',
        message: 'jobs filtered successfully',
      });
    } else {
      res.json({
        status: 'fail',
        message: 'No matching Jobs found',
      });
    }
  });

  return {
    editProfile,
    addProfile,
    applyJob,
    getAppliedJobs,
    allJobs,
    filteredJobs,
    getStatus,
  };
};

export default userController;
