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

// eslint-disable-next-line react-refresh/only-export-components
export const getAllJobs = createAsyncThunk('jobs/getAllJobs', async () => {
  try {
    const response = await userApi.get('/all_jobs');
    console.log(response?.data?.jobs, 'deiiiiii');
    return response?.data?.jobs;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  appliedJobs: {},
  jobs: {},
  error: {},
};

const appliedJobSlice = createSlice({
  name: 'appliedJobs',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(ApplyJob.pending, (state) => {})
      .addCase(ApplyJob.fulfilled, (state, { payload }) => {})
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.jobs = payload;
      })
      .addCase(ApplyJob.rejected, (state, { error }) => {
        // state.error = error?.message || 'Unknown error occured';
      });
  },
});

export default appliedJobSlice.reducer;
