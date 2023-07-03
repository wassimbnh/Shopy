import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const googleLogin = createAsyncThunk('auth/google-login', async (credentials, { rejectWithValue }) => {
try{
const response = await axios.post('http://localhost:4000/api/auth/google-signin', credentials);

localStorage.setItem("rf_token", response.data.token)

return response.data;
}catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const loginSlice = createSlice({
    name: 'auth',
    initialState: {
      token: '',
      loading: false,
      error: null,
    },
    reducers: {
      logout: (state) => {
      state.token = null;
      localStorage.clear();
    }},
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.isLoggedIn = true;
          state.token = action.payload.token; 
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          state.error = action.payload?.msg;
        });
    },
  });

  export const {  logout } = loginSlice.actions;

  
export default loginSlice.reducer;
