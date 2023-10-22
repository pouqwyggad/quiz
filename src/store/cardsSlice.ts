import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { Card, Cards } from '../interfaces/Cards';

export const getCardsAsync = createAsyncThunk<Cards, { id: string }, { rejectValue: any }>(
  'cards/getCards',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cards/card?cardsPack_id=${id}&pageCount=8`);
      return response.data as Cards;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  },
);

export const addCardAsync = createAsyncThunk<Card, { question: string, answer: string, id: string },
{ rejectValue: any }>(
  'cards/edit',
  async ({ question, answer, id }, { rejectWithValue }) => {
    try {
      const card = {
        card: {
          cardsPack_id: id,
          question,
          answer,
          grade: 4,
        },
      };
      const response = await api.post('cards/card', card);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
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
      })
      .addCase(addCardAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCardAsync.fulfilled, (state, action) => {
        Object.assign(state.packCards, action.payload);
        console.log(state.packCards);
        state.loading = false;
      });
  },
});

export default cardsSlice.reducer;
