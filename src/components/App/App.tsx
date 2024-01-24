import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import './App.scss';
import Main from '../../pages/Main/Main';
import { PATH } from '../../constants/paths';
import './App.scss';
import theme from '../../constants/theme';
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage';
import { useAppSelector } from '../../store/hooks';
import BookPage from '../../pages/BookPage/BookPage';
import { errorSelectors } from '../../store/slices/error/errorSlice';
import SearchPage from '../../pages/SearchPage/SearchPage';
import { ErrorBoundary } from '../../pages/ErrorPage/ErrorBoundary';
import SigninPage from '../../pages/SigninPage/SigninPage';
import { memo } from 'react';
import PurchasedPage from '../../pages/PurchasedPage/PurchasedPage';

const App = () => {
  const { error } = useAppSelector(errorSelectors.all);

  return (
    <ErrorBoundary>
      <div className="app" data-testid="app">
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path={PATH.BASE_URL} element={<Main />} />
              <Route path={PATH.SEARCH_RESULTS} element={<SearchPage />} />
              <Route path={PATH.NOT_FOUND} element={<ErrorPage {...error} />} />
              <Route path={PATH.BOOK} element={<BookPage />} />
              <Route path={PATH.SIGN_IN} element={<SigninPage />} />
              <Route path={PATH.PURCHASED} element={<PurchasedPage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </div>
    </ErrorBoundary>
  );
};

export default memo(App);
