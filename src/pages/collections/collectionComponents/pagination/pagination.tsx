import './pagination.scss';
import { useState, useCallback, useContext, useEffect } from 'react';
import PaginationComponent from '../../../../components/paginationComponent';
import { ProductsPageContext } from '../../context';

const productPerPage = 9;
const paginationRange = 5;
const PaginationContainer = () => {
  const { handleFetch, state } = useContext(ProductsPageContext);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPageCount = state.results ? Math.ceil((state.total as number) / productPerPage) : 1;
  const startIndex = Math.max(currentPage - Math.floor(paginationRange / 2), 1);
  const endIndex = Math.min(startIndex + paginationRange - 1, totalPageCount);

  useEffect(() => {
    handleFetch(currentPage);
  }, [currentPage, handleFetch]);

  const handleNextPageClick = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage < totalPageCount ? prevPage + 1 : prevPage));
  }, [totalPageCount]);

  const handlePrevPageClick = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  }, []);

  const handleTargetPageClick = useCallback(
    (page: number) => {
      setCurrentPage(page);
      handleFetch(page);
    },
    [handleFetch],
  );
  return (
    <>
      <div className="collection-page_pagination">
        {state.results ? (
          <ul className="collection-page_pagination-list">
            {Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i).map(
              (page) => (
                <li
                  key={page}
                  className={`collection-page_pagination-item ${currentPage === page ? 'currentPage' : ''}`}
                  onClick={() => handleTargetPageClick(page)}
                >{`${page}`}</li>
              ),
            )}
          </ul>
        ) : (
          'Something went wrong. try again'
        )}
        {state.results.length && (
          <PaginationComponent
            onNextPageClick={handleNextPageClick}
            onPrevPageClick={handlePrevPageClick}
            disable={{
              left: currentPage === 1,
              right: currentPage === totalPageCount,
            }}
            nav={{ current: currentPage, total: totalPageCount }}
          />
        )}
      </div>
    </>
  );
};

export { PaginationContainer };
