"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewJob = exports.FilteredJobs = exports.AllJobs = exports.ApplyJob = exports.DeleteJob = exports.EditJob = exports.createJob = void 0;
const createJob = async (job, jobRepository) => {
    const jobPosted = await jobRepository.addJob(job);
    return jobPosted;
};
exports.createJob = createJob;
//   const token = authService.generateToken(userId.toString());
const EditJob = async (id, job, jobRepository) => {
    const editedData = await jobRepository.editJob(id, job);
    return editedData;
};
exports.EditJob = EditJob;
const DeleteJob = async (id, jobRepository) => {
    const deletedData = await jobRepository.deleteJob(id);
    return deletedData;
};
exports.DeleteJob = DeleteJob;
const ApplyJob = async (applicantId, id, applyJobRepository) => {
    const applyJob = await applyJobRepository.addApplicant(applicantId, id);
    return applyJob;
};
exports.ApplyJob = ApplyJob;
const AllJobs = async (jobRepository) => {
    const allJobs = await jobRepository.getAllJobs();
    return allJobs;
};
exports.AllJobs = AllJobs;
const FilteredJobs = async (query, jobRepository) => {
    const filteredJobs = await jobRepository.getFilteredJobs(query);
    return filteredJobs;
};
exports.FilteredJobs = FilteredJobs;
const ViewJob = async (recId, jobRepository) => {
    const job = await jobRepository.getJobByRecId(recId);
    console.log(job, 'jooo');
    return job;
};
exports.ViewJob = ViewJob;
