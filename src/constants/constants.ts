import { Book } from './interfaces';

export const API_KEY = process.env.API_KEY || '1f95912fc86dfb9f85b5fad164bd0cd9';
export const API_HASH = process.env.API_HASH || 'c0a1ca56fdd47915c4aef607ce82aae5';

export const ITEMS_PER_PAGE = '30';

export const INITIAL_STATE = {
  searchValue: '',
  searchResult: [] as Book[],
  totalItems: 0,
  selectedBook: null,
  error: { title: '', description: '' },
};
