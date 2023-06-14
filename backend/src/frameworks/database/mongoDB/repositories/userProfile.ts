import UserProfile from '../models/userProfile';
import { UserProfileInterface } from '../../../../types/userProfileInterface';
import Job from '../models/jobModel';

export const userProfileDb = () => {
  const addProfile = async (profileData: UserProfileInterface) => {
    return await UserProfile.create(profileData);
  };
  const editProfile = async (_id: string, editedData: UserProfileInterface) => {
    const editedJobData: UserProfileInterface | null =
      await UserProfile.findByIdAndUpdate(
        { _id },
        { $set: editedData },
        { new: true }
      );
    return editedJobData;
  };

  const getAppliedJobs = async (profileId: string) => {
    try {
      const userProfile: any = await UserProfile.findById(profileId)
        .select('appliedJobs')
        .populate('appliedJobs')
        .exec();

      if (!userProfile) {
        return null;
      }

      const appliedJobs = userProfile.appliedJobs;
      const jobs = await Job.find({ _id: { $in: appliedJobs } }).exec();

      return jobs;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    editProfile,
    addProfile,
    getAppliedJobs,
  };
};

export type userProfileDb = typeof userProfileDb;
