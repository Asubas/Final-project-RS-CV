import './sortContainer.scss';
import MyButton from '../../../../components/button/button';
import { useState, useContext, useCallback } from 'react';
import { ProductsPageContext } from '../../context';

function SortContainer({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [priceDirection, setPriceDirection] = useState<'asc' | 'desc'>('asc');
  const [nameDirection, setNameDirection] = useState<'asc' | 'desc'>('asc');
  const [sortName, setSortName] = useState<'price' | 'name.en-GB'>('price');
  const { handleFetch, setSortOption, setCurrentPage } = useContext(ProductsPageContext);
  const [activeSort, setActiveSort] = useState<'price' | 'name.en-GB'>('price');

  const setItem = useCallback(
    (option: 'price' | 'name.en-GB') => {
      let newSortDirection: 'asc' | 'desc' = 'asc';
      if (option === 'price') {
        newSortDirection = priceDirection === 'asc' ? 'desc' : 'asc';
        setPriceDirection(newSortDirection);
        setNameDirection('asc');
      } else {
        newSortDirection = nameDirection === 'asc' ? 'desc' : 'asc';
        setNameDirection(newSortDirection);
        setPriceDirection('asc');
      }
      setSortOption(`${option} ${newSortDirection}`);
      setSortName(option);
      setCurrentPage(1);
      handleFetch(1);
      setSortDirection(newSortDirection);
      setOpen(false);
      setActiveSort(option);
    },
    [
      handleFetch,
      nameDirection,
      priceDirection,
      setCurrentPage,
      setSortOption,
      setActiveSort,
      setOpen,
    ],
  );
  return (
    <div className="products_sort-container">
      {mobile ? (
        <>
          <p className="sort-container_mobile-title-list">Sort by</p>
          <ul className="sort-container_list sort-list">
            <li
              className={`sort-list_item ${activeSort === 'price' ? 'active' : ''}`}
              onClick={() => {
                setItem('price');
                setActiveSort('price');
              }}
            >
              PRICE {priceDirection === 'asc' ? '▼' : '▲'}
            </li>
            <li
              className={`sort-list_item ${activeSort === 'name.en-GB' ? 'active' : ''}`}
              onClick={() => {
                setItem('name.en-GB');
                setActiveSort('name.en-GB');
              }}
            >
              NAME {nameDirection === 'asc' ? '▼' : '▲'}
            </li>
          </ul>
        </>
      ) : (
        <>
          <MyButton
            type="button"
            className={`sort-container_button ${open ? 'sort-container_button__up' : ''}`}
            onClick={() => setOpen(!open)}
          >
            SORT BY {sortName === 'price' ? 'PRICE' : 'NAME'} {sortDirection === 'asc' ? '▼' : '▲'}
          </MyButton>
          {open && (
            <ul className="sort-container_list sort-list">
              <li className="sort-list_item" onClick={() => setItem('price')}>
                PRICE {priceDirection === 'asc' ? '▼' : '▲'}
              </li>
              <li className="sort-list_item" onClick={() => setItem('name.en-GB')}>
                NAME {nameDirection === 'asc' ? '▼' : '▲'}
              </li>
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export { SortContainer };
