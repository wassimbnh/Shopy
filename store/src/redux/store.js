
import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../redux/signupSlice';
import activateReducer from './activateSlice';
import loginReducer from './loginSlice';
import forgetPasswordReducer from './forgetPasswordSlice';
import googleLoginReducer from './googleLoginSlice';
import  resetPasswordReducer  from './resetPasswordSlice';

const store = configureStore({
  reducer: {
    auth: signupReducer,
    activ: activateReducer,
    login: loginReducer,
    forget: forgetPasswordReducer,
    google: googleLoginReducer,
    resetPassword: resetPasswordReducer
  },
});

export default store;
