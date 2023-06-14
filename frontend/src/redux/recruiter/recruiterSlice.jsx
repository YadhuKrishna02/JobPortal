import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../common/apis/authApi';
import recruiterApi from '../../common/apis/recruiterApi';

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
