import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const INITIAL_AUTH = false;

export const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuth: INITIAL_AUTH },
  reducers: {
    setIsAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuth = payload;
    },
  },
});

export const authSelectors = {
  all: (state: RootState) => state.searchParams,
  startIndex: (state: RootState) => state.searchParams.searchParams.startIndex,
};

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
