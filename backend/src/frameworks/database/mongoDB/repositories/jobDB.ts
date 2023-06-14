import Job from '../models/jobModel';
import { JobInterface } from '../../../../types/jobInterface';

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
  return {
    addJob,
    getJob,
    editJob,
    deleteJob,
    getApplicants,
  };
};

export type jobDB = typeof jobDB;
