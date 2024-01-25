/* eslint-disable @typescript-eslint/no-unused-vars */
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const purchasedSlice = createSlice({
  name: 'purchased',
  initialState: { purchased: <string[]>[] },
  reducers: {
    getPurchasedMap: (state, { payload }: PayloadAction<string[]>) => {
      return state;
    },
    addPurchasedBook: (state, { payload }: PayloadAction<string>) => {
      state.purchased = [...state.purchased, payload];
    },

    resetPurchasedMap: (state) => {
      state.purchased = [];
    },
  },
});

export const purchasedSelectors = {
  all: (state: RootState) => state.purchased,
};

export const purchasedActions = purchasedSlice.actions;
export const purchasedReducer = purchasedSlice.reducer;
