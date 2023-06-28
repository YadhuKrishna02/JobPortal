"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStatus = exports.AppliedJobs = exports.EditProfile = exports.CreateProfile = void 0;
const CreateProfile = async (profile, dbRepositoryProfile // Update the parameter type here
) => {
    const createProfile = await dbRepositoryProfile.addProfile(profile);
    return createProfile;
};
exports.CreateProfile = CreateProfile;
const EditProfile = async (id, profile, dbRepositoryProfile, file // Update the parameter type here
) => {
    profile.resume = file;
    const editedData = await dbRepositoryProfile.editProfile(id, profile);
    return editedData;
};
exports.EditProfile = EditProfile;
const AppliedJobs = async (profileId, dbRepositoryProfile) => {
    const appliedJobs = await dbRepositoryProfile.getAppliedJobs(profileId);
    console.log(appliedJobs, 'sujithhh');
    return appliedJobs;
};
exports.AppliedJobs = AppliedJobs;
const GetStatus = async (applicantId, jobId, dbRepositoryProfile) => {
    return await dbRepositoryProfile.getStatus(applicantId, jobId);
};
exports.GetStatus = GetStatus;
