import { HttpStatus } from '../../../types/httpStatus';
import AppError from '../../../utils/appError';
import { profileDbInterface } from '../../repositories/userProfileInterface';

export const CreateProfile = async (
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    education: string;
    languages: string[];
    resume: string;
  },
  dbRepositoryProfile: ReturnType<profileDbInterface> // Update the parameter type here
) => {
  const createProfile = await dbRepositoryProfile.addProfile(profile);
  return createProfile;
};
export const EditProfile = async (
  id: string,
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    education: string;
    languages: string[];
    resume: string;
    profilePicture: string;
  },
  dbRepositoryProfile: ReturnType<profileDbInterface>,
  file: string // Update the parameter type here
) => {
  profile.resume = file;
  const editedData = await dbRepositoryProfile.editProfile(id, profile);
  return editedData;
};

export const AppliedJobs = async (
  profileId: string,
  dbRepositoryProfile: ReturnType<profileDbInterface>
) => {
  const appliedJobs = await dbRepositoryProfile.getAppliedJobs(profileId);
  console.log(appliedJobs, 'sujithhh');

  return appliedJobs;
};

export const GetStatus = async (
  applicantId: string | any,
  jobId: string | any,
  dbRepositoryProfile: ReturnType<profileDbInterface>
) => {
  return await dbRepositoryProfile.getStatus(applicantId, jobId);
};
