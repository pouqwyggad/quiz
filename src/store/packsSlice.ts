import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { Packs } from '../interfaces/Packs';

export const getPacksAsync = createAsyncThunk(
  'pack/getPacks',
  async () => {
    const response = await api.get('/cards/pack?pageCount=8');

    return response.data;
  },
);

export const addNewPackAsync = createAsyncThunk<Packs,
{ name: string, privatePack: boolean }, { rejectValue: any }
>(
  'pack/addNewPack',
  async ({ name, privatePack }, { rejectWithValue }) => {
    try {
      const cardsPack = {
        cardsPack: {
          name,
          private: privatePack,
        },
      };
      const response = await api.post('/cards/pack', cardsPack);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const deletePackAsync = createAsyncThunk<Packs,
{ id: string }, { rejectValue: any }
>(
  'pack/deletePack',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.delete('/cards/pack', { params: { id } });
      console.log(response);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const editPackNameAsync = createAsyncThunk<Packs,
{ id: string, name: string }, { rejectValue: any }
>(
  'pack/edit',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const cardsPack = {
        cardsPack: {
          id,
          name,
        },
      };

      console.log(cardsPack);

      const response = await api.put('/cards/pack', cardsPack);
      console.log(response);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);

interface CardsState {
  cardsInfo: Packs;
  loading: boolean;
  error: any;
  isAuth: boolean;
}

const initialState: CardsState = {
  cardsInfo: {
    cardPacks: [],
    page: 0,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
  },
  loading: false,
  error: null,
  isAuth: false,
};

const packsSlice = createSlice({
  name: 'pack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPacksAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPacksAsync.fulfilled, (state, action) => {
        Object.assign(state.cardsInfo, action.payload);
        state.loading = false;
      })
      .addCase(addNewPackAsync.fulfilled, (state, action) => {
        Object.assign(state.cardsInfo, action.payload);
      })
      .addCase(deletePackAsync.fulfilled, (state, action) => {
        Object.assign(state.cardsInfo, action.payload);
      })
      .addCase(editPackNameAsync.fulfilled, (state, action) => {
        Object.assign(state.cardsInfo, action.payload);
      });
  },
});

export default packsSlice.reducer;