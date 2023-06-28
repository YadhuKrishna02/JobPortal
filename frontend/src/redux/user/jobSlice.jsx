/* eslint-disable react-refresh/only-export-components */
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
      console.log(response?.data?.jobApply[0], 'lplplplp');

      toast.success(response?.data?.message);

      return response?.data?.jobApply[0];
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
    console.log(response, 'rrrrrrrrrr');
    return response?.data?.jobs;
  } catch (error) {
    console.log(error);
  }
});

export const getAppliedJobs = createAsyncThunk(
  'jobs/getAppliedJobs',
  async (id) => {
    try {
      const response = await userApi.get(`/applied_jobs/${id}`);
      return response?.data?.jobs;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchStatus = createAsyncThunk(
  'jobs/fetchStatus',
  async ({ applicantId, jobId }) => {
    try {
      const response = await userApi.get(
        `/fetch_status/?applicantId=${applicantId}&jobId=${jobId}`
      );
      return response?.data?.statusResponse;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  appliedJobs: [],
  currentApplied: {},
  jobs: {},
  filteredJobs: {},
  error: {},
};

const appliedJobSlice = createSlice({
  name: 'appliedJobs',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(ApplyJob.pending, (state) => {})
      .addCase(ApplyJob.fulfilled, (state, { payload }) => {
        state.appliedJobs.push(payload);
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.jobs = payload;
      })
      .addCase(getAppliedJobs.fulfilled, (state, { payload }) => {
        state.currentApplied = payload;
      })
      .addCase(ApplyJob.rejected, (state, { error }) => {
        // state.error = error?.message || 'Unknown error occured';
      });
  },
});

export default appliedJobSlice.reducer;
