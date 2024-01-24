import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Book } from '../../../constants/interfaces';

export const purchasedSlice = createSlice({
  name: 'purchased',
  initialState: { purchased: [] as Array<Book['id']> },
  reducers: {
    getPurchasedArray: (state, { payload }: PayloadAction<Array<Book['id']>>) => {
      return state;
    },
    setPurchasedArray: (state, { payload }: PayloadAction<Book['id']>) => {
      state.purchased = [...state.purchased, payload];
    },
    resetBooksArray: (state) => {
      state.purchased = [];
    },
  },
});

export const purchasedSelectors = {
  all: (state: RootState) => state.purchased,
};

export const purchasedActions = purchasedSlice.actions;
export const purchasedReducer = purchasedSlice.reducer;
