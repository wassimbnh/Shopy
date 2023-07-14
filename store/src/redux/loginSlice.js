import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const storedRefreshToken = localStorage.getItem('rf_token');

let decodedEmail = '';
let decodedName = '';

if (storedRefreshToken) {
  const decodedToken = jwt_decode(storedRefreshToken);

  decodedEmail = decodedToken.email;
  decodedName = decodedToken.name;
}

const initialState = {
  email: decodedEmail,
  name: decodedName,
  token: storedRefreshToken || '',
  refreshToken: localStorage.getItem('rf_token') || '',
  loading: false,
  error: null,
  successMessage: '',
};

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:4000/api/auth/sign-in', credentials);

    localStorage.setItem('rf_token', response.data.token);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.email = '';
      state.name = '';
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = '';
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.successMessage = 'Login successful!';
        if (!payload?.accessToken || !payload?.refreshToken) {
          state.error = 'AccessToken and/or refreshToken not found';
        } else {
          state.accessToken = payload.accessToken;
          state.refreshToken = payload.refreshToken;
          const decodedToken = jwt_decode(payload.accessToken);
          state.email = decodedToken.email;
          state.name = decodedToken.name;
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ? payload.message : 'Login rejected';
        state.successMessage = '';
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
