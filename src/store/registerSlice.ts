import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IRegister } from '../interfaces/AuthResponse';
import api from '../api';

export const registerAsync = createAsyncThunk<boolean, { email: string, password: string }, {}>(
  'auth/register',

  async ({ email, password }) => {
    try {
      const response = await api.post<IRegister>('/auth/register', { email, password });

      return !!response;

      //   if (response) {
      //     return true;
      //   }
      //
      //   return false;
      // } catch (error) {
      //   // @ts-ignore
      //   throw error.response.data;
      // }
    } catch (error) {
      // @ts-ignore
      throw error.response.data;
    }
  },
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: {
    [registerAsync.fulfilled.toString()]: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
  },
});
// export const {} = registerSlice.actions;
export default registerSlice.reducer;
