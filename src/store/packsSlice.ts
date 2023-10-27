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
          _id: id,
          name,
        },
      };

      const response = await api.put('/cards/pack', cardsPack);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const searchPackAsync = createAsyncThunk<Packs,
{ searchValue :string }, { rejectValue: any }>(
  'pack/search',
  async ({ searchValue }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cards/pack?packName=${searchValue}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const filterPacksByIdAsync = createAsyncThunk<Packs,
{ USER_ID :string }, { rejectValue: any }>(
  'pack/searchByUserId',
  async ({ USER_ID }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cards/pack?user_id=${USER_ID}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
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
        state.loading = false;
        Object.assign(state.cardsInfo, action.payload);
      })
      .addCase(addNewPackAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewPackAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePackAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePackAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editPackNameAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPackNameAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(searchPackAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPackAsync.fulfilled, (state, action) => {
        Object.assign(state.cardsInfo, action.payload);
        state.loading = false;
      })
      .addCase(filterPacksByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterPacksByIdAsync.fulfilled, (state, action) => {
        Object.assign(state.cardsInfo, action.payload);
        state.loading = false;
      });
  },
});
export default packsSlice.reducer;
