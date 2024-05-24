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
  console.log(state);
  return (
    <ProductsPageContext.Provider value={{ handleFetch, state }}>
      <div className="collection-page collection-page_top-img">
        <img
          src="src/assets/img/topImgCatalog.jpg"
          width="100%"
          height="308px"
          alt="beautiful tea cup"
        ></img>
      </div>
      <MainContent />
    </ProductsPageContext.Provider>
  );
}

export default Collection;
