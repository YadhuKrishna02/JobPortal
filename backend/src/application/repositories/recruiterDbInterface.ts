import { recruiterDB } from '../../frameworks/database/mongoDB/repositories/recruiterDB';
import { recruiterInterface } from '../../types/recruiterInterface';
import { recruiterProfileInterface } from '../../types/recrProfileInterface';
import Recruiter from '../../frameworks/database/mongoDB/models/recruiterModel';
import { Types } from 'mongoose';

export const recruiterDbInterface = (repository: ReturnType<recruiterDB>) => {
  const getRecruiterByMail = async (email: string) =>
    await repository.getRecruiterByMail(email);

  const getRecruiterByName = async (userName: string) =>
    await repository.getRecruiterByName(userName);

  const addRecruiter = async (
    recruiter: recruiterInterface,
    profileId: Types.ObjectId
  ) => {
    const newRecruiter: any = new Recruiter(recruiter);
    newRecruiter.profileId = profileId;
    newRecruiter.save();
    return newRecruiter;
  };
  const getDetails = async (recId: string) => {
    const recruiter = repository.getDetails(recId);
    return recruiter;
  };

  return {
    getRecruiterByMail,
    getRecruiterByName,
    addRecruiter,
    getDetails,
  };
};

export type RecruiterDbInterface = typeof recruiterDbInterface;
