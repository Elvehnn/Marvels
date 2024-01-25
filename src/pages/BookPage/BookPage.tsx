import { memo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { CircularProgress, Typography } from '@mui/material';
import './BookPage.scss';
import {
  bookDetailsActions,
  bookDetailsSelectors,
} from '../../store/slices/bookDetails/bookDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isLoadingSelectors } from '../../store/slices/isLoading/isLoadingSlice';
import { CSSTransition } from 'react-transition-group';
import MainLayout from '../../components/MainLayout/MainLayout';
import { authSelectors } from '../../store/slices/auth/authSlice';
import { purchasedActions, purchasedSelectors } from '../../store/slices/purchased/purchasedSlice';

const BookPage = () => {
  const dispatch = useAppDispatch();
  const nodeRef = useRef(null);
  const params = useParams<{ id: string }>().id || '';
  const { bookDetails } = useAppSelector(bookDetailsSelectors.all);
  const { isLoading } = useAppSelector(isLoadingSelectors.all);
  const { isAuth } = useAppSelector(authSelectors.all);
  const { purchased } = useAppSelector(purchasedSelectors.all);

  const isPurchased = purchased.includes(String(bookDetails.id));
  const hasPrice = bookDetails.prices && bookDetails.prices[0].price > 0;

  useEffect(() => {
    dispatch(bookDetailsActions.getBookDetails(params));
  }, [params]);

  const handlePurchase = () => {
    dispatch(purchasedActions.addPurchasedBook(String(bookDetails.id)));
  };

  return (
    <MainLayout>
      <CSSTransition
        in={bookDetails.id === +params}
        nodeRef={nodeRef}
        timeout={300}
        classNames="opacity"
        unmountOnExit
      >
        {bookDetails.id === +params && (
          <div className="book-page" data-testid="book-page" ref={nodeRef}>
            <div className="book-page__image-container" data-testid="book-page-image-container">
              <img
                src={`${bookDetails.thumbnail.path}/portrait_incredible.${bookDetails.thumbnail.extension}`}
                alt="book-cover"
                className="image"
              />
            </div>

            <div className="book-page__info" data-testid="book-page-info">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'transparent',
                  color: 'primary.main',
                  opacity: 0.9,
                  mt: '20px',
                }}
                onClick={() => history.back()}
              >
                <KeyboardBackspaceIcon sx={{ fontSize: '35px' }} />
              </Button>

              <Typography
                className="book-page__title"
                variant="h2"
                sx={{ fontWeight: '600', m: '15px 0' }}
              >
                {bookDetails.title}
              </Typography>

              <p className="book-page__description">{bookDetails.description}</p>

              {bookDetails.prices[0].price > 0 && (
                <Typography className="book-page__price" variant="h3">
                  ${bookDetails.prices[0].price}
                </Typography>
              )}

              {isAuth ? (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      opacity: isPurchased || !hasPrice ? 0.2 : 0.9,
                      mt: '20px',
                      pointerEvents: isPurchased || !hasPrice ? 'none' : 'auto',
                    }}
                    onClick={handlePurchase}
                  >
                    Купить
                  </Button>

                  {isPurchased && (
                    <Typography
                      className="book-page__warning"
                      variant="h6"
                      sx={{ fontWeight: '400', m: '15px 0', color: 'warning.main' }}
                    >
                      Уже есть в вашей коллекции
                    </Typography>
                  )}

                  {!hasPrice && (
                    <Typography
                      className="book-page__warning"
                      variant="h6"
                      sx={{ fontWeight: '400', m: '15px 0', color: 'warning.main' }}
                    >
                      Книга отсутствует в продаже
                    </Typography>
                  )}
                </>
              ) : (
                <Typography
                  className="book-page__warning"
                  variant="h6"
                  sx={{ fontWeight: '400', m: '15px 0', color: 'warning.main' }}
                >
                  Авторизуйтесь, чтобы приобрести
                </Typography>
              )}
            </div>
          </div>
        )}
      </CSSTransition>

      {isLoading && <CircularProgress sx={{ position: 'absolute' }} />}
    </MainLayout>
  );
};

export default memo(BookPage);
