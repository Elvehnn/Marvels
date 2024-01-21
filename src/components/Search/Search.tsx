import './Search.scss';
import { useForm } from 'react-hook-form';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { FILTERS } from '../../constants/filters';
import { isFieldEmpty } from '../../services/validators';
import { SORT_TYPES } from '../../constants/sortTypes';
import { isLoadingActions, isLoadingSelectors } from '../../store/slices/isLoading/isLoadingSlice';
import { errorActions } from '../../store/slices/error/errorSlice';
import { totalItemsActions } from '../../store/slices/totalItems/totalItemsSlice';
import { booksActions } from '../../store/slices/books/booksSlice';
import {
  searchParamsActions,
  searchParamsSelectors,
} from '../../store/slices/searchParams/searchParamsSlice';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/paths';

export type FormInputs = {
  newSearchValue: string;
  newSortBy: string;
  newCategory: string;
};

export type SearchPanelStyle = {
  flexGrow?: number;
  position?: string;
  top?: number;
  left?: number;
  borderRadius?: number;
  height?: string;
  flexDirection?: string;
  alignItems?: string;
  rowGap?: string;
};

export const Search = (style: SearchPanelStyle) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(isLoadingSelectors.all);
  const { searchParams } = useAppSelector(searchParamsSelectors.all);
  const { searchValue, category, sortBy } = searchParams;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const handleTitleClick = () => {
    dispatch(totalItemsActions.setTotalItems(0));
    dispatch(booksActions.resetBooksArray());
    dispatch(searchParamsActions.resetSearchParams());
    localStorage.removeItem('lastSearch');
    navigate(PATH.BASE_URL);
  };

  const onSubmit = async (data: FormInputs) => {
    if (isFieldEmpty(data.newSearchValue)) {
      dispatch(errorActions.setError({ title: 'Пустой поисковый запрос', description: '' }));

      return;
    }

    dispatch(isLoadingActions.setIsLoading(true));
    dispatch(errorActions.resetError());
    dispatch(totalItemsActions.setTotalItems(0));
    dispatch(booksActions.resetBooksArray());

    const newSearchParams = {
      searchValue: data.newSearchValue,
      category: data.newCategory,
      sortBy: data.newSortBy,
    };

    dispatch(booksActions.getBooksArray(newSearchParams));
    dispatch(searchParamsActions.setSearchParams({ ...newSearchParams, startIndex: 30 }));
    localStorage.setItem('lastSearch', JSON.stringify({ ...newSearchParams, startIndex: 0 }));
    navigate(PATH.SEARCH_RESULTS);
  };

  const handleReset = () => {
    dispatch(searchParamsActions.resetSearchParams());
    localStorage.removeItem('lastSearch');
    reset({ newSearchValue: '', newSortBy: SORT_TYPES.DEFAULT, newCategory: FILTERS.DEFAULT });
  };

  return (
    <AppBar className="header" data-testid="header" sx={style}>
      <h1 className="header__title" data-testid="header-title" onClick={handleTitleClick}>
        Book search
      </h1>

      <form className="form" data-testid="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="search">
          <div className="search__input-container">
            <TextField
              data-testid="search-input"
              variant="outlined"
              className="search-input"
              defaultValue={searchValue}
              sx={{
                height: '100%',
                backgroundColor: '#fff',
                borderRadius: '6px 0 0 6px',
              }}
              placeholder="Type here for searching…"
              {...register('newSearchValue', { required: 'Nothing to search!' })}
            />
            <Button
              variant="text"
              sx={{
                padding: '6px 16px',
                minWidth: '0',
                height: '100%',
                backgroundColor: '#87A8EC',
                borderRadius: '0 4px 4px 0',
              }}
              className="search__btn"
              data-testid="search-btn"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              <SearchIcon sx={{ color: '#fff' }} />
            </Button>
          </div>

          {errors.newSearchValue && <p>Value is required!</p>}
        </div>

        <div className="search__options">
          <select
            defaultValue={sortBy}
            className="search__sortBy"
            data-testid="search-sortBy"
            {...register('newSortBy')}
          >
            <option value={SORT_TYPES.DEFAULT}>{SORT_TYPES.DEFAULT}</option>
            <option value={SORT_TYPES.NEWEST}>{SORT_TYPES.NEWEST}</option>
          </select>

          <select
            defaultValue={category}
            className="search__categories"
            data-testid="search-categories"
            {...register('newCategory')}
          >
            <option value="0" disabled>
              Categories
            </option>
            <option value={FILTERS.DEFAULT}>{FILTERS.DEFAULT}</option>
            <option value={FILTERS.ART}>{FILTERS.ART}</option>
            <option value={FILTERS.BIORAPHY}>{FILTERS.BIORAPHY}</option>
            <option value={FILTERS.COMPUTERS}>{FILTERS.COMPUTERS}</option>
            <option value={FILTERS.HISTORY}>{FILTERS.HISTORY}</option>
            <option value={FILTERS.MEDICAL}>{FILTERS.MEDICAL}</option>
            <option value={FILTERS.POETRY}>{FILTERS.POETRY}</option>
          </select>
          <Button
            variant="outlined"
            className="search__reset-btn"
            data-testid="search-reset-btn"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset
          </Button>
        </div>
      </form>
    </AppBar>
  );
};
