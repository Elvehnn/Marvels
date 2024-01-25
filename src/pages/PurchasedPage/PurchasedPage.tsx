import MainLayout from '../../components/MainLayout/MainLayout';
import { memo, useEffect, useRef, useState } from 'react';
import { purchasedSelectors } from '../../store/slices/purchased/purchasedSlice';
import { useAppSelector } from '../../store/hooks';
import { Book } from '../../constants/interfaces';
import Typography from '@mui/material/Typography';
import BookPreview from '../../components/BookPreview/BookPreview';
import { CSSTransition } from 'react-transition-group';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { errorSelectors } from '../../store/slices/error/errorSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { isLoadingSelectors } from '../../store/slices/isLoading/isLoadingSlice';
import { getVolumesByIdsArray } from '../../api/api';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const PurchasedPage = () => {
  const { purchased } = useAppSelector(purchasedSelectors.all);
  const { error } = useAppSelector(errorSelectors.all);
  const { isLoading } = useAppSelector(isLoadingSelectors.all);
  const nodeRef = useRef(null);
  const [purchasedBooks, setPurchasedBooks] = useState<Array<Book>>([]);

  const getPurchasedBooks = async (ids: string[]) => {
    const responses = await getVolumesByIdsArray(ids);
    setPurchasedBooks(responses);
  };

  useEffect(() => {
    getPurchasedBooks(purchased);
  }, []);

  const purchasedLength = purchased.length;

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
          <Typography variant="h2" align="center" color="primary.contrastText" sx={{ p: '15px' }}>
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

        {isLoading && <CircularProgress sx={{ position: 'absolute' }} />}
      </div>
    </MainLayout>
  );
};

export default memo(PurchasedPage);
