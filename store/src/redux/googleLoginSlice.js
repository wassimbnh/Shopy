import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const googleLogin = createAsyncThunk('auth/google-login', async (res, { rejectWithValue }) => {
    const token = res?.tokenId;
try{
const response = await axios.post('http://localhost:4000/api/auth/google-signin', { tokenId: token });

localStorage.setItem("rf_token", response.data.token)

return response.data;
}catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const googleLoginSlice = createSlice({
    name: 'login',
    initialState: {
      token: '',
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(googleLogin.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(googleLogin.fulfilled, (state, action) => {
          state.loading = false;
          state.isLoggedIn = true;
          state.token = action.payload.token; 
        })
        .addCase(googleLogin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          state.error = action.payload?.msg;
        });
    },
  });


  
export default googleLoginSlice.reducer;
