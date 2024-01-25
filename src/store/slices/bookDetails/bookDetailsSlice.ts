import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Book } from '../../../constants/interfaces';

export const bookDetailsSlice = createSlice({
  name: 'bookDetails',
  initialState: { bookDetails: {} as Book },
  reducers: {
    getBookDetails: (state, { payload }: PayloadAction<string>) => {
      return state;
    },
    setBookDetails: (state, { payload }: PayloadAction<Book>) => {
      state.bookDetails = { ...state, ...payload };
    },
    resetBookDetails: (state) => {
      state.bookDetails = {} as Book;
    },
  },
});

export const bookDetailsSelectors = {
  all: (state: RootState) => state.bookDetails,
};

export const bookDetailsActions = bookDetailsSlice.actions;
export const bookDetailsReducer = bookDetailsSlice.reducer;
