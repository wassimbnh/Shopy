import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const resetPassword = createAsyncThunk(
  'password/reset',
  async ({ passwords, confirmPassword, token }, { rejectWithValue }) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        'http://localhost:4000/api/auth/reset-password',
        { passwords, confirmPassword },
        { headers }
      );
      return response.data;
    } catch (error) {
      // Handle errors
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ msg: 'No response from the server.' });
      } else {
        return rejectWithValue({ msg: 'Request failed.' });
      }
    }
  }
);


// Create the slice
const passwordSlice = createSlice({
  name: 'password',
  initialState: {
    isLoading: false,
    error: null,
    successMsg: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the resetPassword.pending action
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMsg = null;
    });

    // Handle the resetPassword.fulfilled action
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
      state.successMsg = 'Password was updated successfully.';
    });

    // Handle the resetPassword.rejected action
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.msg || 'Failed to reset password.';
    });
  },
});

// Export the async thunk action and the slice reducer
export { resetPassword };
export default passwordSlice.reducer;
