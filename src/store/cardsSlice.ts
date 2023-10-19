import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { Packs } from '../interfaces/Packs';

export const getCardsAsync = createAsyncThunk(
  'cards/getCards',
  async () => {
    const response = await api.get('/cards/pack?pageCount=10');

    return response.data;
  },
);

export const addNewPackAsync = createAsyncThunk<Packs,
{ name: string, privatePack: boolean }, { rejectValue: any }
>(
  'cards/addNewPack',
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
  'cards/deletePack',
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
  'cards/edit',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const cardsPack = {
        cardsPack: {
          _id: id,
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

const initialState: Packs = {
  cardPacks: [],
  page: 0,
  pageCount: 0,
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 0,
  token: '',
  tokenDeathTime: 0,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCardsAsync.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(addNewPackAsync.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(deletePackAsync.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(editPackNameAsync.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      });
  },
});

export default cardsSlice.reducer;
