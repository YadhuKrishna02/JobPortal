import Job from '../models/jobModel';
import { JobInterface } from '../../../../types/jobInterface';
import { AllJobs } from '../../../../application/use-cases/job/job';

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
  return {
    addJob,
    getJob,
    editJob,
    deleteJob,
    getApplicants,
    getAllJobs,
  };
};

export type jobDB = typeof jobDB;
