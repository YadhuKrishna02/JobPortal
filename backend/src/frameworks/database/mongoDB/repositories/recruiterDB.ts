import { Recruiter } from '../models/recruiterModel';
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

  const getDetails = async (recId: string) => {
    const recruiter = await Recruiter.findById(recId).populate('profileId');
    console.log(recruiter, 'reccccc');
    return recruiter;
  };
  //add user

  const addRecruiter = async (
    recruiter: recruiterInterface,
    profileId: string
  ) => {
    return await Recruiter.create(recruiter);
  };

  return {
    getRecruiterByMail,
    getRecruiterByName,
    addRecruiter,
    getDetails,
  };
};

export type recruiterDB = typeof recruiterDB;
