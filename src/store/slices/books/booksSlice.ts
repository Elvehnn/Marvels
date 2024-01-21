/* eslint-disable @typescript-eslint/no-unused-vars */
import { Book } from '../../../constants/interfaces';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { SearchParams } from '../searchParams/searchParamsSlice';

export const booksSlice = createSlice({
  name: 'books',
  initialState: { booksArray: [] as Book[] },
  reducers: {
    getBooksArray: (state, { payload }: PayloadAction<SearchParams>) => {
      return state;
    },
    setBooksArray: (state, { payload }: PayloadAction<Book[]>) => {
      state.booksArray = [...state.booksArray, ...payload];
    },
    resetBooksArray: (state) => {
      state.booksArray = [];
    },
  },
});

export const booksSelectors = {
  all: (state: RootState) => state.booksArray,
};

export const booksActions = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
