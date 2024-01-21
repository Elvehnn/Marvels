import { ErrorObject } from '../../../constants/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const INITIAL_ERROR_OBJECT: ErrorObject = { title: '', description: '' };

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    error: INITIAL_ERROR_OBJECT,
  },
  reducers: {
    setError: (state, { payload }: PayloadAction<ErrorObject>) => {
      state.error = payload;
    },
    resetError: (state) => {
      state.error = INITIAL_ERROR_OBJECT;
    },
  },
});

export const errorSelectors = {
  all: (state: RootState) => state.error,
};

export const errorActions = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
