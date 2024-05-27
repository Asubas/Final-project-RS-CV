import './collectionMainContent.scss';
import { useEffect, useState } from 'react';
import Filters from './filtersSection/filtersSection';
import { PaginationContainer } from './pagination/pagination';
import Products from './productsSection/productsSection';
import MyButton from '../../../components/button/button';
import { NavigateBack, NavigateForward } from '../../../components/navigateBtn/navigateBtn';
import { IContentProps } from '../../../interfaces/contentProps';
const showFilter = () => {
  console.log('тут будет выпадать поле c фильтрами и чекбоксами');
  return;
};

const MainContent = ({ collectionType }: IContentProps) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="collection-page collection-page_content">
        <div className="collection-page_breadcrumbLinks">
          <NavigateBack />
          Тут будут типа хлебные крошки
          <NavigateForward />
        </div>
        {screenWidth > 870 ? (
          <>
            <Filters />
            <div className="products_sort-container">
              <MyButton type="button">SORT BY </MyButton>
            </div>
          </>
        ) : (
          <>
            <MyButton className="collection-page_show-filter" onClick={showFilter}>
              FILTER
            </MyButton>
            <div className="collection-page_mobile-search">
              <Filters />
              <div className="products_sort-container">
                <MyButton type="button">SORT BY </MyButton>
              </div>
            </div>
          </>
        )}
        <Products />
        <PaginationContainer />
      </div>
    </>
  );
};

export { MainContent };
