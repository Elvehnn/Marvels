import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Book } from '../../../constants/interfaces';

export type PurchasedBookMap = Record<Book['id'], Book>;

export const purchasedSlice = createSlice({
  name: 'purchased',
  initialState: { purchased: [] as PurchasedBookMap },
  reducers: {
    getPurchasedMap: (state, { payload }: PayloadAction<Array<Book['id']>>) => {
      return state;
    },
    addPurchasedBook: (state, { payload }: PayloadAction<Book['id']>) => {
      state.purchased = { ...state.purchased, [payload]: <Book>{} };
    },
    setPurchasedMap: (state, { payload }: PayloadAction<PurchasedBookMap>) => {
      state.purchased = { ...state.purchased, ...payload };
    },
    resetPurchasedMap: (state) => {
      state.purchased = {};
    },
  },
});

export const purchasedSelectors = {
  all: (state: RootState) => state.purchased,
};

export const purchasedActions = purchasedSlice.actions;
export const purchasedReducer = purchasedSlice.reducer;
