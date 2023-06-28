"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recruiterSchema = new mongoose_1.Schema({
    companyName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true,
    },
    userName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please add a valid email'],
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
    },
    profileId: {
        type: String,
        ref: 'RecruiterProfile',
    },
}, { timestamps: true });
const Recruiter = (0, mongoose_1.model)('Recruiter', recruiterSchema);
exports.default = Recruiter;
