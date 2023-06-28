"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicantDbInterface = void 0;
const applicantDbInterface = (repository) => {
    const addApplicant = async (applicantId, jobId) => await repository.addApplicant(applicantId, jobId);
    return {
        addApplicant,
    };
};
exports.applicantDbInterface = applicantDbInterface;
