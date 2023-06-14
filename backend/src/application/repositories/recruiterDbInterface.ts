import { recruiterDB } from '../../frameworks/database/mongoDB/repositories/recruiterDB';
import { recruiterInterface } from '../../types/recruiterInterface';

export const recruiterDbInterface = (repository: ReturnType<recruiterDB>) => {
  const getRecruiterByMail = async (email: string) =>
    await repository.getRecruiterByMail(email);

  const getRecruiterByName = async (userName: string) =>
    await repository.getRecruiterByName(userName);

  const addRecruiter = async (recruiter: recruiterInterface) =>
    await repository.addRecruiter(recruiter);

  return {
    getRecruiterByMail,
    getRecruiterByName,
    addRecruiter,
  };
};

export type RecruiterDbInterface = typeof recruiterDbInterface;
