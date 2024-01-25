import './SearchResults.scss';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BookPreview from '../BookPreview/BookPreview';
import LoadingButton from '@mui/lab/LoadingButton';
import { memo, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { totalItemsSelectors } from '../../store/slices/totalItems/totalItemsSlice';
import { booksActions, booksSelectors } from '../../store/slices/books/booksSlice';
import {
  searchParamsActions,
  searchParamsSelectors,
} from '../../store/slices/searchParams/searchParamsSlice';
import { isLoadingActions, isLoadingSelectors } from '../../store/slices/isLoading/isLoadingSlice';
import { ITEMS_PER_PAGE } from '../../constants/constants';
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage';
import { errorSelectors } from '../../store/slices/error/errorSlice';
import { CSSTransition } from 'react-transition-group';

const SearchResults = () => {
  const dispatch = useAppDispatch();
  const nodeRef = useRef(null);
  const { totalItems } = useAppSelector(totalItemsSelectors.all);
  const { booksArray } = useAppSelector(booksSelectors.all);
  const { searchParams } = useAppSelector(searchParamsSelectors.all);
  const { isLoading } = useAppSelector(isLoadingSelectors.all);
  const { error } = useAppSelector(errorSelectors.all);

  const [paginationDisabled, setPaginationDisabled] = useState(false);

  const handleLoadMoreClick = async () => {
    dispatch(isLoadingActions.setIsLoading(true));

    const { searchValue, startIndex } = searchParams;

    dispatch(booksActions.getBooksArray({ searchValue, startIndex }));
    dispatch(searchParamsActions.incrementStartIndex());

    const isBooksArrayFull = booksArray.length !== 0 && startIndex + +ITEMS_PER_PAGE >= totalItems;
    setPaginationDisabled(isBooksArrayFull);
  };

  return (
    <div className="search-results">
      {totalItems ? (
        <Typography
          variant="h4"
          align="center"
          color="text.secondary"
          sx={{ p: '15px' }}
          data-testid="main-title"
        >
          Found {totalItems} items
        </Typography>
      ) : null}

      <CSSTransition
        in={Boolean(booksArray.length)}
        nodeRef={nodeRef}
        timeout={300}
        classNames="opacity"
        unmountOnExit
      >
        <div className="cards-container" ref={nodeRef}>
          {booksArray.map((book) => {
            return <BookPreview key={book.id} {...book} />;
          })}
        </div>
      </CSSTransition>

      <CSSTransition
        in={Boolean(!booksArray.length)}
        nodeRef={nodeRef}
        timeout={300}
        classNames="opacity"
        unmountOnExit
      >
        <div className="cards-container" ref={nodeRef}>
          <ErrorPage {...error} />
        </div>
      </CSSTransition>

      {booksArray.length && booksArray.length >= 20 ? (
        <LoadingButton
          size="medium"
          onClick={handleLoadMoreClick}
          loading={isLoading}
          variant="contained"
          disabled={paginationDisabled}
          data-testid="load-more"
        >
          Load more
        </LoadingButton>
      ) : null}

      {booksArray.length && booksArray.length >= 20 ? (
        <Fab
          variant="circular"
          onClick={() => window.scrollTo(0, 0)}
          sx={{ position: 'sticky', bottom: '75px', alignSelf: 'flex-end' }}
        >
          <NavigationIcon />
        </Fab>
      ) : null}

      {isLoading && <CircularProgress sx={{ position: 'absolute' }} />}
    </div>
  );
};

const memoSearchResults = memo(SearchResults);

export default memoSearchResults;
