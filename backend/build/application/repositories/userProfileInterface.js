"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileDbInterface = void 0;
const profileDbInterface = (repository) => {
    const editProfile = async (_id, profile) => await repository.editProfile(_id, profile);
    const addProfile = async (profile) => await repository.addProfile(profile);
    const getAppliedJobs = async (profileId) => await repository.getAppliedJobs(profileId);
    const getStatus = async (applicantId, jobId) => await repository.getStatus(applicantId, jobId);
    return {
        editProfile,
        addProfile,
        getAppliedJobs,
        getStatus,
    };
};
exports.profileDbInterface = profileDbInterface;
