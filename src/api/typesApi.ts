import { Book } from '../constants/interfaces';

export type ResponseStatus = {
  ok?: string;
  status?: number;
};

export type APIError = {
  reason: string;
  status: string;
};

export type BooksResponse = {
  items: Book[];
  totalItems: number;
};

export type ApiResponse = {
  status: number;
  data: BooksResponse;
};
