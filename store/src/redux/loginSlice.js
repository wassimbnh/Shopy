    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axios from 'axios';

    export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await axios.post('http://localhost:4000/api/auth/sign-in', credentials);
    const { refresh_token } = response.data;

    // Store the tokens in local storage
    localStorage.setItem("_appSignging", true);

    return refresh_token;
    });

    const loginSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.token = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
    });

    export default loginSlice.reducer;
