import './collectionPage.scss';
import { useCallback, useEffect, useState } from 'react';
import MainContent from './collectionComponents/collectionMainContent';
import { ProductsPageContext, productsPageContextDefaultValue } from './context';
import { getProductList } from './requestsToProducts/productList';

function Collection() {
  const [state, setState] = useState(productsPageContextDefaultValue.state);
  const handleFetch = useCallback((offset?: number) => {
    getProductList(offset).then((res) => setState(res));
  }, []);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <ProductsPageContext.Provider value={{ handleFetch, state }}>
      <div className="collection-page collection-page_top-img"></div>
      <MainContent />
    </ProductsPageContext.Provider>
  );
}

export default Collection;
