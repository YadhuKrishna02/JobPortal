import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../common/apis/jobSeekerApi';
import { toast } from 'react-hot-toast';

export const ApplyJob = createAsyncThunk(
  'appliedJobs/ApplyJob',
  async ({ jobId, payload }) => {
    try {
      const response = await userApi.post(
        `/apply_job?jobId=${jobId}&applicantId=${payload}`
      );
      toast.success(response?.data?.message);
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      //   return error.response.data;
    }
  }
);

const initialState = {
  appliedJobs: {},
  error: {},
};

const appliedJobSlice = createSlice({
  name: 'appliedJobs',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(ApplyJob.pending, (state) => {})
      .addCase(ApplyJob.fulfilled, (state, { payload }) => {
        console.log(payload, 'pppp');
        console.log('Applied Job');
      })
      .addCase(ApplyJob.rejected, (state, { error }) => {
        // state.error = error?.message || 'Unknown error occured';
      });
  },
});

export default appliedJobSlice.reducer;
