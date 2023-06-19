import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recruiterApi from '../../common/apis/recruiterApi';

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

export const DeleteJob = createAsyncThunk('jobs/DeleteJob', async (jobId) => {
  try {
    const response = await recruiterApi.delete(`/delete_job/${jobId}`);
    console.log(response.data, 'responseDelete');
    return response.data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    throw new Error(errorMessage);
  }
});

export const GetJobById = createAsyncThunk('jobs/GetJobById', async (recId) => {
  try {
    const response = await recruiterApi.get(`/view_job/${recId}`);
    console.log(response?.data?.getJob, 'lalalla');
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
      .addCase(DeleteJob.fulfilled, (state, { payload }) => {
        const deletedJobId = payload.deletedJob._id;
        state.jobs = state.jobs.filter((job) => job.job._id !== deletedJobId);
      })

      .addCase(createJob.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(GetJobById.fulfilled, (state, { payload }) => {
        state.jobsById = payload;
      });
  },
});
export default jobSlice.reducer;
