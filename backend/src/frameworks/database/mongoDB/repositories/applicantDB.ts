import mongoose, { Types } from 'mongoose';
import Job from '../models/jobModel';
import UserProfile from '../models/userProfile';
import AppError from '../../../../utils/appError';
import { HttpStatus } from '../../../../types/httpStatus';
// import { JobInterface } from '../../../../types/jobInterface';

export const applicantDB = () => {
  const addApplicant = async (
    applicantId: mongoose.Types.ObjectId,
    jobId: Types.ObjectId
  ) => {
    const job = await Job.findById(jobId);
    const userProfile = await UserProfile.findOne({ applicantId });

    if (!job || !userProfile) {
      throw new AppError('Invalid job or user profile', HttpStatus.BAD_REQUEST);
    }

    const alreadyApplied = job.appliedUsers.includes(applicantId);
    if (alreadyApplied) {
      throw new AppError('Already applied', HttpStatus.BAD_REQUEST);
    }

    job.appliedUsers.push(applicantId);
    userProfile.appliedJobs.push(jobId);

    return await Promise.all([job.save(), userProfile.save()]).then(
      (result) => {
        console.log(result, 'llll');
      }
    );
  };

  return {
    addApplicant,
  };
};

export type applicantDB = typeof applicantDB;
