import { configureStore } from '@reduxjs/toolkit';
import { booksReducer } from './slices/books/booksSlice';
import { errorReducer } from './slices/error/errorSlice';
import { isLoadingReducer } from './slices/isLoading/isLoadingSlice';
import { searchParamsReducer } from './slices/searchParams/searchParamsSlice';
import { totalItemsReducer } from './slices/totalItems/totalItemsSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { bookDetailsReducer } from './slices/bookDetails/bookDetailsSlice';
import { authReducer } from './slices/auth/authSlice';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    booksArray: booksReducer,
    totalItems: totalItemsReducer,
    isAuth: authReducer,
    searchParams: searchParamsReducer,
    isLoading: isLoadingReducer,
    error: errorReducer,
    bookDetails: bookDetailsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

export default store;

saga.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
