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
    console.log(applicantId, 'tyyyy');
    const userProfile: any = await UserProfile.findOne({ _id: applicantId });
    console.log(userProfile, 'ioioioioio');

    const userjob = await Job.findById(jobId);

    if (!userjob || !userProfile) {
      throw new AppError('Invalid job or user profile', HttpStatus.BAD_REQUEST);
    }

    const appliedJobs = userProfile.appliedJobs;
    // console.log(appliedJobs, 'lllllllllll');

    const jobExists = appliedJobs.some(
      (appliedJob: any) => appliedJob._id == jobId
    );

    if (!jobExists) {
      appliedJobs.push({ _id: jobId, status: 'pending' });
      // userProfile.appliedJobs = appliedJobs;
    }

    const applicants = userjob.appliedUsers;
    if (!applicants.includes(applicantId)) {
      applicants.push(applicantId);
      userjob.appliedUsers = applicants;
    }

    // const alreadyApplied = job.appliedUsers.includes(applicantId);
    // if (alreadyApplied) {
    //   throw new AppError('Already applied', HttpStatus.BAD_REQUEST);
    // }

    // job.appliedUsers.push(applicantId);
    // userProfile.appliedJobs.push(jobId);

    return await Promise.all([userjob.save(), userProfile.save()]).then(
      (result) => {
        // console.log(result, 'yoooooo');

        return result;
      }
    );
  };

  return {
    addApplicant,
  };
};

export type applicantDB = typeof applicantDB;
