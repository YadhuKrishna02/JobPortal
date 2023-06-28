"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeStatus = exports.SendInterviewLink = exports.ProfileEdit = exports.applicantDetails = void 0;
const applicantDetails = async (jobId, jobRepository) => {
    const applicantDetails = await jobRepository.getApplicants(jobId);
    return applicantDetails;
};
exports.applicantDetails = applicantDetails;
const ProfileEdit = async (editedData, profileId, recProfileRepository, file) => {
    editedData.logo = file;
    return await recProfileRepository.editProfile(profileId, editedData);
    // console.log(recruiterProfile, 'seddd');
    // return recruiterProfile;
};
exports.ProfileEdit = ProfileEdit;
const SendInterviewLink = async (roomId, email, firstName, nodeMailerRepository) => {
    return await nodeMailerRepository.emailVerification(email, firstName, roomId);
};
exports.SendInterviewLink = SendInterviewLink;
const ChangeStatus = async (jobId, appplicantId, status, jobRepository) => {
    const statusResponse = await jobRepository.statusChange(jobId, appplicantId, status);
    return statusResponse;
};
exports.ChangeStatus = ChangeStatus;
