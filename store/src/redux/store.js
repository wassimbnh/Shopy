
import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../redux/signupSlice';
import activateSlice from './activateSlice';

const store = configureStore({
  reducer: {
    auth: signupReducer,
    activ: activateSlice
  },
});

export default store;
