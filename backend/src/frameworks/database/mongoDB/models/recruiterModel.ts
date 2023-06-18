import mongoose, { Schema, model } from 'mongoose';

const recruiterSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const Recruiter = model('Recruiter', recruiterSchema);
export default Recruiter;
