import './collectionMainContent.scss';
import { useEffect, useState } from 'react';
import { Filters } from './filtersSection/filtersSection';
import { PaginationContainer } from './pagination/pagination';
import Products from './productsSection/productsSection';
import MyButton from '../../../components/button/button';
import { IContentProps } from '../../../interfaces/contentProps';
import { BreadcrumbsComponent } from './breadcrumbLinks/breadBackForwComp';
import { SortContainer } from './sortContainer/sortContainer';

const MainContent = ({ collectionType }: IContentProps) => {
  const [open, setOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  sessionStorage.setItem('type', collectionType);
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
        <BreadcrumbsComponent />
        {screenWidth > 980 ? (
          <>
            <Filters />
            <SortContainer mobile={false} />
          </>
        ) : (
          <>
            <MyButton
              className={`collection-page_show-filter ${open ? 'collection-page_show-filter__active' : ''}`}
              onClick={() => setOpen(!open)}
            >
              FILTER
            </MyButton>
            {open && (
              <div className="collection-page_mobile-search">
                <Filters />
                <SortContainer mobile={true} />
              </div>
            )}
          </>
        )}
        <Products />
        <PaginationContainer />
      </div>
    </>
  );
};

export { MainContent };
