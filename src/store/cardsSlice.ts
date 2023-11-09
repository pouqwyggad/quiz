import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { Cards } from '../interfaces/Cards';

export const getCardsAsync = createAsyncThunk<Cards, {
  PACK_ID?: string,
  rowsPerPage?: number,
  page?: number,
  sortCards?: string
  cardQuestion?: string },
{ rejectValue: any }>(

  'cards/get',

  async (
    {
      PACK_ID,
      page = 1,
      rowsPerPage = 6,
      sortCards = '0grade',
      cardQuestion = '',
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.get('/cards/card', {
        params: {
          cardsPack_id: PACK_ID,
          pageCount: rowsPerPage,
          page,
          sortCards,
          cardQuestion,
        },
      });
      return response.data as Cards;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  },
);

export const addCardAsync = createAsyncThunk<void,
{ question: string, answer: string, PACK_ID: string }, { rejectValue: any }>(

  'cards/add',
  // eslint-disable-next-line consistent-return
  async ({ question, answer, PACK_ID }, { rejectWithValue }) => {
    try {
      const card = {
        card: {
          cardsPack_id: PACK_ID, question, answer, grade: 4,
        },
      };
      await api.post('cards/card', card);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const deleteCardAsync = createAsyncThunk<void, { CARD_ID: string }, { rejectValue: any }>(

  'cards/delete',
  // eslint-disable-next-line consistent-return
  async ({ CARD_ID }, { rejectWithValue }) => {
    try {
      await api.delete(`/cards/card?id=${CARD_ID}`);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const editCardAsync = createAsyncThunk<void,
{ question: string, answer: string, CARD_ID: string }, { rejectValue: any }>(

  'cards/edit',
  // eslint-disable-next-line consistent-return
  async ({ question, answer, CARD_ID }, { rejectWithValue }) => {
    try {
      const card = {
        card: {
          _id: CARD_ID,
          question,
          answer,
        },
      };
      await api.put('cards/card', card);
    } catch (e: any) {
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
        state.loading = false;
      })
      .addCase(addCardAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCardAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editCardAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCardAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCardAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCardAsync.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export default cardsSlice.reducer;
