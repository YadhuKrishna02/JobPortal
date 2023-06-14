import { jobDB } from '../../frameworks/database/mongoDB/repositories/jobDB';
import { JobInterface } from '../../types/jobInterface';

export const jobDbInterface = (repository: ReturnType<jobDB>) => {
  const addJob = async (job: JobInterface) => await repository.addJob(job);

  const getJob = async (jobTitle: string) => await repository.getJob(jobTitle);

  const editJob = async (_id: string, editedData: JobInterface) =>
    await repository.editJob(_id, editedData);

  const deleteJob = async (id: string) => await repository.deleteJob(id);

  const getApplicants = async (jobId: string) =>
    await repository.getApplicants(jobId);

  return {
    addJob,
    getJob,
    editJob,
    deleteJob,
    getApplicants,
  };
};

export type JobDbInterface = typeof jobDbInterface;
