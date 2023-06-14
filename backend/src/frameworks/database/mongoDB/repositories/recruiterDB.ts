import Recruiter from '../models/recruiterModel';
import { recruiterInterface } from '../../../../types/recruiterInterface';

export const recruiterDB = () => {
  const getRecruiterByMail = async (email: string) => {
    const recruiterEmail: recruiterInterface | null = await Recruiter.findOne({
      email,
    });
    return recruiterEmail;
  };

  const getRecruiterByName = async (userName: string) => {
    const recruiter: recruiterInterface | null = await Recruiter.findOne({
      userName,
    });
    return recruiter;
  };
  //add user

  const addRecruiter = async (recruiter: recruiterInterface) => {
    return await Recruiter.create(recruiter);
  };

  return {
    getRecruiterByMail,
    getRecruiterByName,
    addRecruiter,
  };
};

export type recruiterDB = typeof recruiterDB;
