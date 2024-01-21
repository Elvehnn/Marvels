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

const BookPage = () => {
  const dispatch = useAppDispatch();
  const nodeRef = useRef(null);
  const params = useParams<{ id: string }>().id || '';
  const { bookDetails } = useAppSelector(bookDetailsSelectors.all);
  const { isLoading } = useAppSelector(isLoadingSelectors.all);

  useEffect(() => {
    dispatch(bookDetailsActions.getBookDetails(params));
  }, [params]);

  return (
    <>
      <CSSTransition
        in={bookDetails.id === params}
        nodeRef={nodeRef}
        timeout={300}
        classNames="opacity"
        unmountOnExit
      >
        {bookDetails.id === params && (
          <div className="book-page" data-testid="book-page" ref={nodeRef}>
            <div className="book-page__image-container" data-testid="book-page-image-container">
              <img
                src={`${bookDetails.volumeInfo.imageLinks.thumbnail}`}
                alt="book-cover"
                className="image"
              />
            </div>
            <div className="book-page__info" data-testid="book-page-info">
              <Typography className="book-page__categories" variant="h5">
                {bookDetails.volumeInfo.categories?.join(' / ')}
              </Typography>
              <Typography
                className="book-page__title"
                variant="h4"
                sx={{ fontWeight: '600', m: '15px 0' }}
              >
                {bookDetails.volumeInfo.title}
              </Typography>
              <Typography className="book-page__authors" variant="h5">
                {bookDetails.volumeInfo.authors?.join(',  ')}
              </Typography>
              <p className="book-page__description">{bookDetails.volumeInfo?.description}</p>

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
            </div>
          </div>
        )}
      </CSSTransition>

      {isLoading && <CircularProgress sx={{ position: 'absolute' }} />}
    </>
  );
};

const memoBookPage = memo(BookPage);
export default memoBookPage;
