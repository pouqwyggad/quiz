import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import registerReducer from './registerSlice';
import resetPasswordReducer from './resetPasswordSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    resetPassword: resetPasswordReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
