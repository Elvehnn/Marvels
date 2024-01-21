import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export const isLoadingSelectors = {
  all: (state: RootState) => state.isLoading,
};

export const isLoadingActions = isLoadingSlice.actions;
export const isLoadingReducer = isLoadingSlice.reducer;
