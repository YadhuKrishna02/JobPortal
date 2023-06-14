import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  education: {
    type: String,
  },
  languages: {
    type: [String],
    default: [],
  },
  resume: {
    type: String,
  },
  appliedJobs: {
    type: Array,
  },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
