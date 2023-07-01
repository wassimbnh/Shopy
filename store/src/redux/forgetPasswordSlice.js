import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const forgetPassword = createAsyncThunk('user/forgetPassword', async (email,  { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:4000/api/auth/forgot-password', { email });
    return response.data;
  }catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const forgetPasswordSlice = createSlice({
  name: 'forget',
  initialState: {
    activationStatus: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.activationStatus = null;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.activationStatus = action.payload;
        state.error = null;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.activationStatus = null;
        state.error = action.error.message;
      });
  },
});

export default forgetPasswordSlice.reducer;
