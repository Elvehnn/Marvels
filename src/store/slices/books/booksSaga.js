import { call, put, takeEvery } from 'redux-saga/effects';
import { booksActions } from './booksSlice';
import { totalItemsActions } from '../totalItems/totalItemsSlice';
import { errorActions } from '../error/errorSlice';
import { isLoadingActions } from '../isLoading/isLoadingSlice';
import { bookDetailsActions } from '../bookDetails/bookDetailsSlice';
import { getVolumesByTitleRequest, getVolumeById } from '../../../api/api';

export function* workBookDetails({ payload }) {
  yield put(isLoadingActions.setIsLoading(true));

  try {
    const response = yield call(getVolumeById, payload);

    if (response && response.status === 200) {
      yield put(bookDetailsActions.setBookDetails(response.data.data.results[0]));
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
  const { searchValue, startIndex = 0 } = payload;
  const options = `&offset=${startIndex}`;

  try {
    const searchResults = yield call(getVolumesByTitleRequest, searchValue, options);

    console.log(searchResults.data.data.results);

    if (searchResults && searchResults.data.data.total > 0) {
      yield put(booksActions.setBooksArray(searchResults.data.data.results));

      if (!startIndex) yield put(totalItemsActions.setTotalItems(searchResults.data.data.total));
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
