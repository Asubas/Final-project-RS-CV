import './collectionPage.scss';
import { useCallback, useEffect, useState } from 'react';
import { MainContent } from './collectionComponents/collectionMainContent';
import { ProductsPageContext, productsPageContextDefaultValue } from './context';
import { getAllProducts, getProductList } from './requestsToProducts/productList';
import { useParams } from 'react-router-dom';
import MyButton from '../../components/button/button';
function SelectedCollection() {
  let collectionTypeId = '';
  const { collectionType = '' } = useParams();
  let selectorName = '';
  if (collectionType === 'tea') {
    selectorName = 'collection-page_top-img__tea';
    collectionTypeId = 'caf2b3c5-799e-4d6e-860c-363bf2d6542b';
  } else if (collectionType === 'coffee') {
    selectorName = 'collection-page_top-img__coffee';
    collectionTypeId = '86625d6c-fcb0-4f8d-a58f-9f67cc8b13a4';
  } else if (collectionType === 'cocoa') {
    selectorName = 'collection-page_top-img__cocoa';
    collectionTypeId = '7a2657a3-ae01-452b-8e33-edb51503dceb';
  } else if (collectionType === 'kitchen') {
    collectionTypeId = '608ca2b6-ea06-4e5c-b6d6-5a8ae2724903';
  }
  const [state, setState] = useState(productsPageContextDefaultValue.state);
  const handleFetch = useCallback(
    (offset?: number) => {
      getProductList(offset, collectionTypeId || '').then((res) => setState(res));
    },
    [collectionTypeId],
  );

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);
  return (
    <ProductsPageContext.Provider value={{ handleFetch, state }}>
      <div className={`collection-page collection-page_top-img ${selectorName}`}></div>
      <MainContent collectionType={collectionTypeId} />
      <MyButton className="btn_black" onClick={getAllProducts}>
        ПОЛУЧИТБ ВСЕ ПРОДУКТЫ В ОТВЕТЕ С СЕРВЕРА НАХ{' '}
      </MyButton>
    </ProductsPageContext.Provider>
  );
}

export default SelectedCollection;
