import MainLayout from '../../components/MainLayout/MainLayout';
import { memo, useEffect, useRef, useState } from 'react';
import { purchasedActions, purchasedSelectors } from '../../store/slices/purchased/purchasedSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Book } from '../../constants/interfaces';
import Typography from '@mui/material/Typography';
import { BookPreview } from '../../components/BookPreview/BookPreview';
import { CSSTransition } from 'react-transition-group';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { errorSelectors } from '../../store/slices/error/errorSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import { isLoadingActions, isLoadingSelectors } from '../../store/slices/isLoading/isLoadingSlice';
import { authSelectors } from '../../store/slices/auth/authSlice';
import { getVolumesByIdsArray } from '../../api/api';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const PurchasedPage = () => {
  const dispatch = useAppDispatch();
  const { purchased } = useAppSelector(purchasedSelectors.all);
  const { error } = useAppSelector(errorSelectors.all);
  const { isLoading } = useAppSelector(isLoadingSelectors.all);
  const { isAuth } = useAppSelector(authSelectors.all);
  const nodeRef = useRef(null);
  const [purchasedBooks, setPurchasedBooks] = useState<Array<Book>>([]);

  // const [paginationDisabled, setPaginationDisabled] = useState(false);

  // const handleLoadMoreClick = async () => {
  //   dispatch(isLoadingActions.setIsLoading(true));

  //   const { searchValue, startIndex } = searchParams;

  //   dispatch(booksActions.getBooksArray({ searchValue, startIndex }));
  //   dispatch(searchParamsActions.incrementStartIndex());

  //   const isBooksArrayFull = booksArray.length !== 0 && startIndex + +ITEMS_PER_PAGE >= totalItems;
  //   setPaginationDisabled(isBooksArrayFull);
  //   dispatch(isLoadingActions.setIsLoading(false));
  // };

  const getPurchasedBooks = async (ids: string[]) => {
    const responses = await getVolumesByIdsArray(ids);
    console.log(responses);
    setPurchasedBooks(responses);
  };

  useEffect(() => {
    getPurchasedBooks(purchased);
  }, []);

  const purchasedLength = purchased.length;

  console.log(purchased);
  console.log(isAuth);

  return (
    <MainLayout>
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
      <div className="search-results">
        {
          <Typography
            variant="h4"
            align="center"
            color="text.secondary"
            sx={{ p: '15px' }}
            data-testid="main-title"
          >
            {purchasedLength
              ? `Вы счастливый обладатель ${purchasedLength} книг`
              : 'Все еще впереди'}
          </Typography>
        }

        <CSSTransition
          in={Boolean(purchasedLength)}
          nodeRef={nodeRef}
          timeout={300}
          classNames="opacity"
          unmountOnExit
        >
          <div className="cards-container" ref={nodeRef}>
            {purchasedBooks.map((book) => {
              return <BookPreview key={book.id} {...book} />;
            })}
          </div>
        </CSSTransition>

        <CSSTransition
          in={Boolean(!purchasedLength)}
          nodeRef={nodeRef}
          timeout={300}
          classNames="opacity"
          unmountOnExit
        >
          <div className="cards-container" ref={nodeRef}>
            <ErrorPage {...error} />
          </div>
        </CSSTransition>

        {/* {purchasedBooks.length && purchasedBooks.length >= 20 ? (
          <LoadingButton
            size="medium"
            // onClick={handleLoadMoreClick}
            loading={isLoading}
            variant="contained"
            disabled={paginationDisabled}
            data-testid="load-more"
          >
            Load more
          </LoadingButton>
        ) : null} */}

        {isLoading && <CircularProgress sx={{ position: 'absolute' }} />}
      </div>
    </MainLayout>
  );
};

export default memo(PurchasedPage);