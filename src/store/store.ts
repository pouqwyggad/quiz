import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import registerReducer from './registerSlice';
import resetPasswordReducer from './resetPasswordSlice';
import cardsReducer from './cardsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    resetPassword: resetPasswordReducer,
    cards: cardsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
