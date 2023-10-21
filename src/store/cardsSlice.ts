import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { Cards } from '../interfaces/Cards';

export const getCardsAsync = createAsyncThunk<Cards, { id: string }, {}>(
  'cards/getCards',
  async ({ id }) => {
    try {
      console.log(id);
      const response = await api.get(`/cards/card?cardsPack_id=${id}`);
      console.log(response);
      return response.data as Cards;
    } catch (e: any) {
      console.log(e);
      throw e; // Выбросить ошибку, чтобы она была видна как reject в action
    }
  },
);

interface CardsState {
  packCards: Cards;
  loading: boolean;
  error: any;
  isAuth: boolean;
}

const initialState: CardsState = {
  packCards: {
    cards: [],
    packUserId: '',
    packName: '',
    packPrivate: false,
    packCreated: '',
    packUpdated: '',
    page: 0,
    pageCount: 0,
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    token: '',
    tokenDeathTime: 0,
  },
  loading: false,
  error: null,
  isAuth: false,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCardsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCardsAsync.fulfilled, (state, action) => {
        Object.assign(state.packCards, action.payload);
        console.log(state.packCards);
        state.loading = false;
      });
  },
});

export default cardsSlice.reducer;
