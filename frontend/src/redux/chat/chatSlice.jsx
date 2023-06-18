import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatApi } from '../../common/apis/chatApi';
import authApi from '../../common/apis/authApi';
import { toast } from 'react-hot-toast';

export const createChat = createAsyncThunk(
  'chats/createChat',
  async (payload) => {
    try {
      console.log(payload, 'ppppppp');
      const response = await chatApi.post(`/`, payload);
      console.log(response, 'rrrrrr');
      //   toast.success(response?.data?.message);
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      //   return error.response.data;
    }
  }
);

export const userChats = async (id) => {
  try {
    const response = await chatApi.get(`/${id}`);
    console.log(response, 'rrrrrr');
    //   toast.success(response?.data?.message);
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const getRecruiter = createAsyncThunk(
  'chats/getRecruiter',
  async (id) => {
    try {
      const response = await authApi.get(`/recruiter_details/${id}`);
      console.log(response, 'rrrrrr');
      //   toast.success(response?.data?.message);
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      //   return error.response.data;
    }
  }
);
export const getUsers = createAsyncThunk('chats/getUsers', async (id) => {
  try {
    const response = await authApi.get(`/job_seeker_details/${id}`);
    console.log(response, 'rrrrrr');
    //   toast.success(response?.data?.message);
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    //   return error.response.data;
  }
});

const initialState = {
  chats: {},
};

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {})
      .addCase(createChat.fulfilled, (state, { payload }) => {
        console.log(payload, 'pppp');
      })
      .addCase(createChat.rejected, (state, { error }) => {
        // state.error = error?.message || 'Unknown error occured';
      });
  },
});

export default chatSlice.reducer;
