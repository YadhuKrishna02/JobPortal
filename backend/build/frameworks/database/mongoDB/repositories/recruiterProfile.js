"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recProfileDb = void 0;
const recruiterProfile_1 = require("../models/recruiterProfile");
const recProfileDb = () => {
    const addProfile = async (profileData) => {
        return await recruiterProfile_1.RecruiterProfile.create(profileData);
    };
    const editProfile = async (_id, editedData) => {
        const editedJobData = await recruiterProfile_1.RecruiterProfile.findByIdAndUpdate({ _id }, { $set: editedData }, { new: true });
        console.log(editedJobData, 'jooooooo');
        return editedJobData;
    };
    return {
        addProfile,
        editProfile,
    };
};
exports.recProfileDb = recProfileDb;
