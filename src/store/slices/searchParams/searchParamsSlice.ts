import { FILTERS } from '../../../constants/filters';
import { SORT_TYPES } from '../../../constants/sortTypes';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ITEMS_PER_PAGE } from '../../../constants/constants';

export type SearchParams = {
  searchValue: string;
  startIndex?: number;
};

const INITIAL_SEARCH_PARAMS = {
  searchValue: '',
  startIndex: 0,
};

export const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState: { searchParams: INITIAL_SEARCH_PARAMS },
  reducers: {
    setSearchParams: (state, { payload }: PayloadAction<SearchParams>) => {
      state.searchParams = { ...state.searchParams, ...payload };
    },
    incrementStartIndex: (state) => {
      state.searchParams.startIndex += +ITEMS_PER_PAGE;
    },
    resetSearchParams: (state) => {
      state.searchParams = INITIAL_SEARCH_PARAMS;
    },
  },
});

export const searchParamsSelectors = {
  all: (state: RootState) => state.searchParams,
  startIndex: (state: RootState) => state.searchParams.searchParams.startIndex,
};

export const searchParamsActions = searchParamsSlice.actions;
export const searchParamsReducer = searchParamsSlice.reducer;
