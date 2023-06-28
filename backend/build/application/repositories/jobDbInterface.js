"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobDbInterface = void 0;
const jobDbInterface = (repository) => {
    const addJob = async (job) => await repository.addJob(job);
    const getJob = async (jobTitle) => await repository.getJob(jobTitle);
    const editJob = async (_id, editedData) => await repository.editJob(_id, editedData);
    const deleteJob = async (id) => await repository.deleteJob(id);
    const getApplicants = async (jobId) => await repository.getApplicants(jobId);
    const getAllJobs = async () => await repository.getAllJobs();
    const getJobByRecId = async (recId) => {
        return await repository.getJobByRecId(recId);
    };
    const getFilteredJobs = async (query) => await repository.getFilteredJobs(query);
    const statusChange = async (jobId, applicantId, status) => await repository.changeStatus(jobId, applicantId, status);
    return {
        addJob,
        getJob,
        editJob,
        deleteJob,
        getApplicants,
        getAllJobs,
        getJobByRecId,
        getFilteredJobs,
        statusChange,
    };
};
exports.jobDbInterface = jobDbInterface;
