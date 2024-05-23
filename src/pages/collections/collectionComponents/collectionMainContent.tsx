import './collectionMainContent.scss';
import Filters from './filtersSection/filtersSection';
import Products from './productsSection/productsSection';
const Content = () => {
  return (
    <>
      <div className="collection-page collection-page_content">
        <div className="collection-page_breadcrumbLinks">Тут будут типа хлебные крошки</div>
        <Filters />
        <Products />
      </div>
    </>
  );
};

export default Content;
