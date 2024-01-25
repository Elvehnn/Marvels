export interface Action {
  type: string;
  isLoading?: boolean;
  searchValue?: string;
  searchResult?: Book[];
  totalItems?: number;
  selectedBook?: Book | null;
  error?: ErrorObject;
}

export interface Book {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  prices: Array<{ price: number; type: string }>;
}

export type ErrorObject = {
  title: string;
  description: string;
};
