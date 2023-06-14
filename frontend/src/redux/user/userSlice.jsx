import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../common/apis/authApi';
import userApi from '../../common/apis/jobSeekerApi';

export const addAsyncUser = createAsyncThunk(
  'users/addAsyncUser',
  async (payload) => {
    try {
      const response = await authApi.post('/signup', payload);
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error; // Throw the error to be caught in the .catch() block
    }
  }
);
export const editUserProfile = createAsyncThunk(
  'users/editUserProfile',
  async ({ payload, profileId }) => {
    try {
      console.log(payload, 'ooooooo');
      const response = await userApi.put(`/edit_profile/${profileId}`, payload);
      console.log(response.data, 'ressssss');
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error; // Throw the error to be caught in the .catch() block
    }
  }
);
export const loginUser = createAsyncThunk('users/login', async (payload) => {
  try {
    const response = await authApi.post('/login', payload);
    return response.data;
  } catch (error) {
    // Handle error
    console.log(error);
    throw error; // Throw the error to be caught in the .catch() block
  }
});

export const googleAddAsyncUser = createAsyncThunk(
  'users/googleAddAsyncUser',
  async (payload) => {
    try {
      const response = await authApi.post('/sign-in-with-google', payload);
      console.log(response?.data);
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  users: {},
  profile: {},
  error: {},
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.users = payload;
    },
    logoutUser: (state) => {
      state.users = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAsyncUser.pending, (state) => {
        console.log('Pending');
      })
      .addCase(addAsyncUser.fulfilled, (state, { payload }) => {
        console.log('Signup Successful');
        state.users = payload;
        state.profile = payload?.profile;
      })
      .addCase(editUserProfile.fulfilled, (state, { payload }) => {
        console.log('Edited Profile Successfuly');
        state.profile = payload?.editedProfile;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        console.log('Login Successful');
        state.users = payload;
      })
      .addCase(googleAddAsyncUser.fulfilled, (state, { payload }) => {
        console.log('Verified Successfully');
        if (payload?.profile) {
          state.users = payload;
          state.profile = payload?.profile;
        } else {
          state.users = payload;
        }
      })
      .addCase(addAsyncUser.rejected, (state) => {
        console.log('Rejected');
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.error = error;
      });
  },
});

export const addUsers = (state) => state.users.users;
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
