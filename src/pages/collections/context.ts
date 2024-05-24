import { ProductProjection } from '@commercetools/platform-sdk';
import { createContext } from 'react';

export type TState = {
  count: number;
  limit: number;
  offset: number;
  results: ProductProjection[];
  total?: number;
};

type SomeProps = {
  state: TState;
  handleFetch: (page: number) => void;
};

export const productsPageContextDefaultValue: SomeProps = {
  state: {
    count: 0,
    limit: 0,
    results: [],
    total: 0,
    offset: 0,
  },
  handleFetch: () => {},
};

export const ProductsPageContext = createContext<SomeProps>(productsPageContextDefaultValue);
