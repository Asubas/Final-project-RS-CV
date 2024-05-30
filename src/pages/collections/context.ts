import { ProductProjection } from '@commercetools/platform-sdk';
import { createContext } from 'react';

export type TState = {
  count: number;
  limit: number;
  offset?: number;
  results: ProductProjection[];
  total?: number;
  sort?: string;
  currentPage?: number;
};

type ProductContentType = {
  sortOption: string;
  state: TState;
  handleFetch: (page: number) => void;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: (page: number) => void;
};

export const productsPageContextDefaultValue: ProductContentType = {
  state: {
    count: 0,
    limit: 0,
    results: [],
    total: 0,
    offset: 0,
  },
  setSortOption: () => {},
  handleFetch: () => {},
  sortOption: '',
  setCurrentPage: () => {},
};

export const ProductsPageContext = createContext<ProductContentType>(
  productsPageContextDefaultValue,
);
