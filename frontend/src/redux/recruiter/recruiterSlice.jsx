import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../common/apis/authApi';
import recruiterApi from '../../common/apis/recruiterApi';
import { toast } from 'react-hot-toast';

export const addAsyncRecruiter = createAsyncThunk(
  'recruiters/addAsyncRecruiter',
  async (payload) => {
    try {
      const response = await authApi.post('/recruiter/signup', payload);

      return response.data;
    } catch (error) {
      // Handle error
      return error?.response?.data?.message; // Throw the error to be caught in the .catch() block
    }
  }
);
export const loginRecruiter = createAsyncThunk(
  'recruiters/loginRecruiter',
  async (payload) => {
    try {
      const response = await authApi.post('/recruiter/login', payload);

      return response.data;
    } catch (error) {
      // Handle error
      return error?.response?.data?.message; // Throw the error to be caught in the .catch() block
    }
  }
);

export const editProfile = createAsyncThunk(
  'recruiters/editProfile',
  async ({ profileId, payload }) => {
    try {
      console.log(profileId, payload, 'ssss');
      const response = await recruiterApi.put(
        `/edit_profile/${profileId}`,
        payload
      );
      console.log(response, 'resss');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const viewApplicants = createAsyncThunk(
  'recruiters/viewApplicants',
  async (jobId) => {
    try {
      const response = await recruiterApi.get(`/applicants_list/${jobId}`);

      return response.data;
    } catch (error) {
      // Handle error
      return error?.response?.data?.message; // Throw the error to be caught in the .catch() block
    }
  }
);
export const changeApplicantsStatus = createAsyncThunk(
  'recruiters/changeApplicantsStatus',
  async ({ jobId, applicantId, applicationStatus }) => {
    try {
      const response = await recruiterApi.post(
        `/change_applicant_status/?jobId=${jobId}&applicantId=${applicantId}&status=${applicationStatus}`
      );

      if (response?.data?.status == 'success') {
        toast.success('Status changed successfully');
      }
    } catch (error) {
      // Handle error
      return error?.response?.data?.message; // Throw the error to be caught in the .catch() block
    }
  }
);

const initialState = {
  recruiters: {},
};

const recruiterSlice = createSlice({
  name: 'recruiters',
  initialState,
  reducers: {
    logout: (state) => {
      state.recruiters = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAsyncRecruiter.pending, () => {})
      .addCase(addAsyncRecruiter.fulfilled, (state, { payload }) => {
        return { ...state, recruiters: payload };
      })
      .addCase(loginRecruiter.fulfilled, (state, { payload }) => {
        return { ...state, recruiters: payload };
      })
      .addCase(addAsyncRecruiter.rejected, () => {});
  },
});
export default recruiterSlice.reducer;
export const { logout } = recruiterSlice.actions;
