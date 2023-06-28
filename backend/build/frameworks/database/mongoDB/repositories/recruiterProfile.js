"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recProfileDb = void 0;
const recruiterProfile_1 = __importDefault(require("../models/recruiterProfile"));
const recProfileDb = () => {
    const addProfile = async (profileData) => {
        return await recruiterProfile_1.default.create(profileData);
    };
    const editProfile = async (_id, editedData) => {
        const editedJobData = await recruiterProfile_1.default.findByIdAndUpdate({ _id }, { $set: editedData }, { new: true });
        console.log(editedJobData, 'jooooooo');
        return editedJobData;
    };
    return {
        addProfile,
        editProfile,
    };
};
exports.recProfileDb = recProfileDb;
