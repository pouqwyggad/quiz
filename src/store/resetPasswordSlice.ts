import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const resetPasswordAsync = createAsyncThunk<{}, { email: string }, {}>(
  'resetPassword/reset',

  async ({ email }) => {
    try {
      await api.post(
        '/auth/forgot',
        {
          email,
          from: 'test-front-admin <ai73a@yandex.by>',
          message: "<div> password recovery link: <a href='http://localhost:3000/auth/set-new-password/$token$'>link</a></div>",
        },
      );
    } catch (e) {
      console.log(e);
    }
  },
);

export const requestOnResetAsync = createAsyncThunk<{}, { newPassword: string, path: string }, {}>(
  'sendPassword/reset',
  async ({ newPassword, path }) => {
    try {
      await api.post('/auth/set-new-password', { newPassword, path });
    } catch (e) {
      console.log(e);
    }
  },
);

const initialState = {
  error: null,
};

const resetPasswordSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: {
    [resetPasswordAsync.fulfilled.toString()]: (state, action) => {
      console.log(action.payload);
    },
  },
});
// export const {} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
