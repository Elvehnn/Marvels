import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const totalItemsSlice = createSlice({
  name: 'totalItems',
  initialState: {
    totalItems: 0,
  },
  reducers: {
    setTotalItems: (state, { payload }: PayloadAction<number>) => {
      state.totalItems = payload;
    },
  },
});

export const totalItemsSelectors = {
  all: (state: RootState) => state.totalItems,
};

export const totalItemsActions = totalItemsSlice.actions;
export const totalItemsReducer = totalItemsSlice.reducer;
