import { call, put, takeEvery, all } from 'redux-saga/effects';
import { booksActions } from './booksSlice';
import { totalItemsActions } from '../totalItems/totalItemsSlice';
import { errorActions } from '../error/errorSlice';
import { isLoadingActions } from '../isLoading/isLoadingSlice';
import { bookDetailsActions } from '../bookDetails/bookDetailsSlice';
import { getVolumesByTitleRequest, getVolumeById } from '../../../api/api';
import { purchasedActions } from '../purchased/purchasedSlice';

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

function* workGetPurchasedBooks({ payload }) {
  console.log(payload);
  yield put(isLoadingActions.setIsLoading(true));

  try {
    const response = yield all(
      payload.map((bookId) => {
        return call(getVolumeById, bookId);
      })
    );
    console.log(response);
    if (response.every((bookResponse) => bookResponse && bookResponse.status === 200)) {
      const purchasedBooksMap = response.reduce(
        (acc, book) => ({ ...acc, [book.data.data.results[0].id]: book.data.data.results[0] }),
        {}
      );

      console.log(purchasedBooksMap);
      yield put(purchasedActions.setPurchasedMap(purchasedBooksMap));
    }
    // return response;
  } catch (error) {
    console.log(error);
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
  yield takeEvery('purchased/getPurchasedMap', workGetPurchasedBooks);
  yield takeEvery('bookDetails/getBookDetails', workBookDetails);
}
