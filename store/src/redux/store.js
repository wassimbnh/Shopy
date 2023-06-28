
import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../redux/signupSlice';
import activateReducer from './activateSlice';
import loginReducer from './loginSlice';

const store = configureStore({
  reducer: {
    auth: signupReducer,
    activ: activateReducer,
    login: loginReducer
  },
});

export default store;
