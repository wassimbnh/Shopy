import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const activateUser = createAsyncThunk(
'user/activate',
async (activation_token) => {
try {
const response = await axios.post('http://localhost:4000/api/auth/activation', { activation_token: activation_token });
return response.data;
} catch (error) {
throw new Error(error.response.data.msg);
}
}
);

const userSlice = createSlice({
name: 'user',
initialState: {
activationStatus: null,
error: null,
},
reducers: {},
extraReducers: (builder) => {
builder
.addCase(activateUser.pending, (state) => {
state.activationStatus = null;
state.error = null;
})
.addCase(activateUser.fulfilled, (state, action) => {
state.activationStatus = action.payload;
state.error = null;
})
.addCase(activateUser.rejected, (state, action) => {
state.activationStatus = null;
state.error = action.error.message;
});
},
});

export default userSlice.reducer;