import './collectionPage.scss';
import { useCallback, useEffect, useState } from 'react';
import { MainContent } from './collectionComponents/collectionMainContent';
import { ProductsPageContext, productsPageContextDefaultValue } from './context';
import { getProductList } from './requestsToProducts/productList';
import { useParams } from 'react-router-dom';

function SelectedCollection() {
  const { collectionType = '' } = useParams();
  const [state, setState] = useState(productsPageContextDefaultValue.state);
  const handleFetch = useCallback(
    (offset?: number) => {
      getProductList(offset, collectionType).then((res) => setState(res));
    },
    [collectionType],
  );

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  let selectorName = '';
  if (collectionType === 'caf2b3c5-799e-4d6e-860c-363bf2d6542b') {
    selectorName = 'collection-page_top-img__tea';
  } else if (collectionType === '86625d6c-fcb0-4f8d-a58f-9f67cc8b13a4') {
    selectorName = 'collection-page_top-img__coffee';
  } else if (collectionType === '7a2657a3-ae01-452b-8e33-edb51503dceb') {
    selectorName = 'collection-page_top-img__cocoa';
  }

  return (
    <ProductsPageContext.Provider value={{ handleFetch, state }}>
      <div className={`collection-page collection-page_top-img ${selectorName}`}></div>
      <MainContent collectionType={collectionType} />
    </ProductsPageContext.Provider>
  );
}

export default SelectedCollection;
