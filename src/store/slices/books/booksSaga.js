import { FILTERS } from '../../../constants/filters';
import { SORT_TYPES } from '../../../constants/sortTypes';
import { call, put, takeEvery } from 'redux-saga/effects';
import { booksActions } from './booksSlice';
import { totalItemsActions } from '../totalItems/totalItemsSlice';
import { errorActions } from '../error/errorSlice';
import { isLoadingActions } from '../isLoading/isLoadingSlice';
import { bookDetailsActions } from '../bookDetails/bookDetailsSlice';
import { getVolumesByTermsRequest, getVolumeById } from '../../../api/api';

export function* workBookDetails({ payload }) {
  yield put(isLoadingActions.setIsLoading(true));

  try {
    const response = yield call(getVolumeById, payload);

    if (response && response.status === 200) {
      yield put(bookDetailsActions.setBookDetails(response.data));
    }
  } catch (error) {
    yield put(
      errorActions.setError({
        title: 'Что-то пошло не так...',
        description: 'Попробуйте еще раз.',
      })
    );
  } finally {
    yield put(isLoadingActions.setIsLoading(false));
  }
}

function* workGetBooksArray({ payload }) {
  const { searchValue, category, sortBy, startIndex = 0 } = payload;
  const categoryOption = category === FILTERS.DEFAULT ? '' : `+subject:${category}`;
  const sortingOption = sortBy === SORT_TYPES.DEFAULT ? '' : `&orderBy=${sortBy}`;
  const options = `${categoryOption}${sortingOption}&startIndex=${startIndex}`;

  try {
    const searchResults = yield call(getVolumesByTermsRequest, searchValue, options);

    if (searchResults && searchResults.data.totalItems > 0) {
      yield put(booksActions.setBooksArray(searchResults.data.items));

      if (!startIndex) yield put(totalItemsActions.setTotalItems(searchResults.data.totalItems));
    } else {
      yield put(
        errorActions.setError({
          title: '',
          description: 'Ничего не найдено.',
        })
      );
    }
  } catch (error) {
    yield put(
      errorActions.setError({
        title: 'Что-то пошло не так...',
        description: 'Попробуйте переформулировать запрос',
      })
    );
  } finally {
    yield put(isLoadingActions.setIsLoading(false));
  }
}

export default function* booksSaga() {
  yield takeEvery('books/getBooksArray', workGetBooksArray);
  yield takeEvery('bookDetails/getBookDetails', workBookDetails);
}
