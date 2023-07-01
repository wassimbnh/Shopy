
import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../redux/signupSlice';
import activateReducer from './activateSlice';
import loginReducer from './loginSlice';
import forgetPasswordReducer from './forgetPasswordSlice';

const store = configureStore({
  reducer: {
    auth: signupReducer,
    activ: activateReducer,
    login: loginReducer,
    forget: forgetPasswordReducer
  },
});

export default store;
