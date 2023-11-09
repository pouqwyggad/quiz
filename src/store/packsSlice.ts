import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { Packs } from '../interfaces/Packs';

export const getPacksAsync = createAsyncThunk<Packs, {
  searchValue? :string,
  currentUser? :string,
  MAX? :number,
  MIN? :number,
  page?: number,
  sortPacks?: string
  rowsPerPage?: number }, { rejectValue: any }>(

  'pack/getPacks',

  async ({
    searchValue = '',
    currentUser = '',
    MAX = 130,
    MIN = 0,
    page = 1,
    rowsPerPage = 8,
    sortPacks = '0updated',
  }) => {
    const response = await api.get('/cards/pack', {
      params: {
        min: MIN,
        max: MAX,
        sortPacks,
        page,
        pageCount: rowsPerPage,
        packName: searchValue,
        user_id: currentUser,
      },
    });
    return response.data;
  },
);

export const addNewPackAsync = createAsyncThunk<Packs,
{ name: string, privatePack: boolean }, { rejectValue: any }>(

  'pack/addNewPack',

  async ({ name, privatePack }, { rejectWithValue }) => {
    try {
      const cardsPack = {
        cardsPack: { name, private: privatePack },
      };
      const response = await api.post('/cards/pack', cardsPack);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const deletePackAsync = createAsyncThunk<Packs,
{ id: string }, { rejectValue: any }>(

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
{ id: string, name: string }, { rejectValue: any }>(

  'pack/edit',

  async ({ id, name }, { rejectWithValue }) => {
    try {
      const cardsPack = {
        cardsPack: { _id: id, name },
      };

      const response = await api.put('/cards/pack', cardsPack);
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
      });
  },
});
export default packsSlice.reducer;
