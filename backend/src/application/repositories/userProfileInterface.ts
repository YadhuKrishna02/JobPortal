import { UserProfileInterface } from '../../types/userProfileInterface';
import { userProfileDb } from '../../frameworks/database/mongoDB/repositories/userProfile';

export const profileDbInterface = (repository: ReturnType<userProfileDb>) => {
  const editProfile = async (_id: string, profile: UserProfileInterface) =>
    await repository.editProfile(_id, profile);

  const addProfile = async (profile: UserProfileInterface | any) =>
    await repository.addProfile(profile);

  const getAppliedJobs = async (profileId: string) =>
    await repository.getAppliedJobs(profileId);

  const getStatus = async (applicantId: string, jobId: string) =>
    await repository.getStatus(applicantId, jobId);

  return {
    editProfile,
    addProfile,
    getAppliedJobs,
    getStatus,
  };
};

export type profileDbInterface = typeof profileDbInterface;
