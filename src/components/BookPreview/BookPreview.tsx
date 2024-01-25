import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import './BookPreview.scss';
import { Book } from '../../constants/interfaces';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { bookDetailsActions } from '../../store/slices/bookDetails/bookDetailsSlice';
import { memo } from 'react';

const BookPreview = (props: Book) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleBookPreviewClick = async (book: Book) => {
    dispatch(bookDetailsActions.getBookDetails(String(book.id)));
    navigate(`/book/${book.id}`);
  };

  return (
    <Card
      className="book"
      data-testid="book"
      sx={{
        p: '15px',
        display: 'flex',
        cursor: 'pointer',
        backgroundColor: '#ggg',
        width: '350px',
        height: '220px',
        minHeight: '150px',
      }}
      onClick={() => handleBookPreviewClick(props)}
    >
      <div
        className="book__preview"
        data-testid="book-preview"
        style={{
          background: `url('${props.thumbnail.path}/portrait_small.${props.thumbnail.extension}') no-repeat center center `,
          backgroundSize: 'contain',
        }}
      ></div>
      <div className="book__info">
        <Typography
          className="book__title"
          data-testid="book-title"
          variant="h5"
          sx={{ fontWeight: '600' }}
        >
          {props.title}
        </Typography>
      </div>
    </Card>
  );
};

export default memo(BookPreview);
