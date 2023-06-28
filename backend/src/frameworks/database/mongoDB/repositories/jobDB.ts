import { Job } from '../models/jobModel';
import { UserProfile } from '../models/userProfile';
import { JobInterface } from '../../../../types/jobInterface';
import { FilterQuery } from 'mongoose';

export const jobDB = () => {
  //add user
  const getJob = async (jobTitle: string) => {
    const job: JobInterface | null = await Job.findOne({ jobTitle });
    return job;
  };
  const addJob = async (recruiter: JobInterface) => {
    return await Job.create(recruiter);
  };

  //edit job

  const editJob = async (_id: string, editedData: JobInterface) => {
    const editedJobData: JobInterface | null = await Job.findByIdAndUpdate(
      { _id },
      { $set: editedData },
      { new: true }
    );
    return editedJobData;
  };

  const deleteJob = async (id: string) => {
    const deletedJob: any = await Job.findByIdAndDelete(id);
    return deletedJob;
  };

  const getApplicants = async (jobId: string) => {
    const applicants = await Job.findById(jobId).populate('appliedUsers');
    console.log(applicants?.appliedUsers, 'oooooo');

    return applicants?.appliedUsers;
  };

  const getAllJobs = async () => {
    const jobList = await Job.find();
    return jobList;
  };
  const getJobByRecId = async (recId: string) => {
    const jobs = await Job.find({ recruiterId: recId });
    console.log(jobs, 'jobsFramee');

    return jobs;
  };

  const getFilteredJobs = async (query: FilterQuery<JobInterface>) => {
    const filteredJobs = await Job.find(query);
    return filteredJobs;
  };

  const changeStatus = async (
    jobId: string,
    applicantId: string,
    status: string
  ) => {
    const statusResponse = await UserProfile.findOneAndUpdate(
      {
        _id: applicantId,
        'appliedJobs._id': jobId,
      },
      { $set: { 'appliedJobs.$.status': status } },
      { new: true }
    );
    return statusResponse;
  };
  return {
    addJob,
    getJob,
    editJob,
    deleteJob,
    getApplicants,
    getAllJobs,
    getJobByRecId,
    getFilteredJobs,
    changeStatus,
  };
};

export type jobDB = typeof jobDB;
