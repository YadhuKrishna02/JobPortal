import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recruiterApi from '../../common/apis/recruiterApi';

// eslint-disable-next-line react-refresh/only-export-components
export const createJob = createAsyncThunk(
  'jobs/addAsyncRecruiter',
  async (payload) => {
    try {
      const response = await recruiterApi.post('/create_job', payload);

      return response.data;
    } catch (error) {
      // Handle error
      const errorMessage = error?.response?.data?.message;
      throw new Error(errorMessage); // Throw the error to be caught in the .catch() block
    }
  }
);
export const EditJob = createAsyncThunk(
  'jobs/EditJob',
  async ({ jobId, payload }) => {
    try {
      const response = await recruiterApi.put(`/edit_job/${jobId}`, payload);

      return response.data;
    } catch (error) {
      // Handle error
      const errorMessage = error?.response?.data?.message;
      throw new Error(errorMessage); // Throw the error to be caught in the .catch() block
    }
  }
);

// eslint-disable-next-line react-refresh/only-export-components
export const getJobById = createAsyncThunk('jobs/getJobById', async (recId) => {
  try {
    const response = await recruiterApi.get(`/view_job/${recId}`);
    return response?.data?.getJob;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  jobs: [],
  jobsById: {},
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createJob.fulfilled, (state, { payload }) => {
        state.error = null;
        state.jobs.push(payload);
      })
      .addCase(EditJob.fulfilled, (state, { payload }) => {
        const jobIndex = state.jobs.findIndex(
          (job) => job.job._id === payload.editedJob._id
        );

        if (jobIndex !== -1) {
          state.jobs[jobIndex].job = payload.editedJob;
        }
      })

      .addCase(createJob.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(getJobById.fulfilled, (state, { payload }) => {
        console.log(payload, 'payyyyyyyyy');
        state.jobsById = payload;
      });
  },
});
export default jobSlice.reducer;
