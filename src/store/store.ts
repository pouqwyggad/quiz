import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardsSlice';
import authReducer from './authSlice';
import registerReducer from './registerSlice';
import resetPasswordReducer from './resetPasswordSlice';
import packsReducer from './packsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    resetPassword: resetPasswordReducer,
    packs: packsReducer,
    cards: cardsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
