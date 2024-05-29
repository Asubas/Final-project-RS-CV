import './collectionPage.scss';
import { useCallback, useEffect, useState } from 'react';
import { MainContent } from './collectionComponents/collectionMainContent';
import { ProductsPageContext, productsPageContextDefaultValue } from './context';
import { getProductList } from './requestsToProducts/productList';
import { useLocation } from 'react-router-dom';
import { teaUrl, TeaUrlType } from '../../constants/teaCollection';
import { coffeeUrl } from '../../constants/coffeeCollections';
import { cocoaUrl } from '../../constants/cocaCollections';
function SelectedCollection() {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/');
  const collectionTypeUrl: string = pathParts[pathParts.length - 1] || '';
  let selectorName = '';
  let collectionType = '';

  if (pathParts[2] === 'tea') {
    selectorName = 'collection-page_top-img__tea';
    collectionType =
      Object.keys(teaUrl).find((k) => (teaUrl as TeaUrlType)[k] === collectionTypeUrl) || '';
  } else if (pathParts[2] === 'coffee') {
    selectorName = 'collection-page_top-img__coffee';
    collectionType =
      Object.keys(coffeeUrl).find((k) => (coffeeUrl as TeaUrlType)[k] === collectionTypeUrl) || '';
  } else if (pathParts[2] === 'cocoa') {
    selectorName = 'collection-page_top-img__cocoa';
    collectionType =
      Object.keys(cocoaUrl).find((k) => (cocoaUrl as TeaUrlType)[k] === collectionTypeUrl) || '';
  }

  const [state, setState] = useState(productsPageContextDefaultValue.state);

  const handleFetch = useCallback(
    (offset: number) => {
      getProductList(9, offset, collectionType).then((res) => setState(res));
    },
    [collectionType],
  );

  useEffect(() => {
    handleFetch(0);
  }, [handleFetch]);

  const currentCollectionType = collectionType;
  return (
    <ProductsPageContext.Provider value={{ handleFetch, state }}>
      <div className={`collection-page collection-page_top-img ${selectorName}`}></div>
      <MainContent collectionType={currentCollectionType} />
    </ProductsPageContext.Provider>
  );
}

export default SelectedCollection;
