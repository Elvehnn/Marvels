import booksSaga from './slices/books/booksSaga';

export default function* rootSaga() {
  yield booksSaga();
}
