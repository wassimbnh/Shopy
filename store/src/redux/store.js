
import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../redux/signupSlice';

const store = configureStore({
  reducer: {
    auth: signupReducer,
    // Add other reducers here if needed
  },
});

export default store;
