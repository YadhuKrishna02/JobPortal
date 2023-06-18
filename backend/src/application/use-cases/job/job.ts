import { HttpStatus } from '../../../types/httpStatus';
import AppError from '../../../utils/appError';
import { JobDbInterface } from '../../repositories/jobDbInterface';
import { applicantDbInterface } from '../../repositories/applicantDbInterface';
import mongoose, { Types } from 'mongoose';

export const createJob = async (
  job: {
    _id: string;
    jobTitle: string;
    jobType: string;
    jobVacancies: string;
    jobTiming: string;
    about: string;
    essentialKnowledge: string;
    skills: string[];
    jobLocation: string;
    qualification: string;
    salary: string;
    experience: string;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
  },
  jobRepository: ReturnType<JobDbInterface>
) => {
  const jobPosted = await jobRepository.addJob(job);
  return jobPosted;
};
//   const token = authService.generateToken(userId.toString());

export const EditJob = async (
  id: string,
  job: {
    _id: string;
    jobTitle: string;
    jobType: string;
    jobVacancies: string;
    jobTiming: string;
    about: string;
    essentialKnowledge: string;
    skills: string[];
    jobLocation: string;
    qualification: string;
    salary: string;
    experience: string;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
  },
  jobRepository: ReturnType<JobDbInterface>
) => {
  const editedData = await jobRepository.editJob(id, job);
  return editedData;
};

export const DeleteJob = async (
  id: string,
  jobRepository: ReturnType<JobDbInterface>
) => {
  const deletedData = await jobRepository.deleteJob(id);
  return deletedData;
};

export const ApplyJob = async (
  applicantId: mongoose.Types.ObjectId,
  id: Types.ObjectId,
  applyJobRepository: ReturnType<applicantDbInterface>
) => {
  const applyJob = await applyJobRepository.addApplicant(applicantId, id);
  return applyJob;
};

export const AllJobs = async (jobRepository: ReturnType<JobDbInterface>) => {
  const allJobs = await jobRepository.getAllJobs();
  return allJobs;
};
