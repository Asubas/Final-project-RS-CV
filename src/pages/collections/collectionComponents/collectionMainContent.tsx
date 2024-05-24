import './collectionMainContent.scss';
import Filters from './filtersSection/filtersSection';
import { PaginationContainer } from './pagination/pagination';
import Products from './productsSection/productsSection';
const Content = () => {
  return (
    <>
      <div className="collection-page collection-page_content">
        <div className="collection-page_breadcrumbLinks">Тут будут типа хлебные крошки</div>
        <Filters />
        <Products />
        <PaginationContainer />
      </div>
    </>
  );
};

export default Content;
