import './seatchBtn.scss';
import { useEffect, useRef, useState, useCallback } from 'react';
import logoSearch from '../../../assets/svg/icon-search.svg';
import MyInput from '../../input/input';
import { getProductList } from '../../../pages/collections/requestsToProducts/productList';
import { ProductProjection } from '@commercetools/platform-sdk';
function SearchBtn() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductProjection[]>([]);

  const toggleSearchVisibility = useCallback(() => {
    setIsSearchVisible((prevIsSearchVisible) => {
      if (!prevIsSearchVisible) {
        setSearchQuery('');
        setSearchResults([]);
      }
      return !prevIsSearchVisible;
    });
  }, [setSearchQuery, setSearchResults]);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        searchInputRef.current !== event.target
      ) {
        toggleSearchVisibility();
      }
    },
    [toggleSearchVisibility],
  );

  useEffect(() => {
    if (isSearchVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSearchVisible, handleOutsideClick]);

  const handleSearch = useCallback(
    (query: string) => {
      const allResults: ProductProjection[] = [];
      getProductList(9, 0, '', 'price desc', '', '', false, query).then((response) => {
        allResults.push(...response.results);
        setSearchResults(allResults);
      });
      console.log(query);
      //
    },
    [setSearchResults],
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value;
      setSearchQuery(newQuery);
      if (newQuery !== '') {
        handleSearch(newQuery);
        setIsSearchVisible(true);
      } else {
        setSearchResults([]);
        setIsSearchVisible(false);
      }
    },
    [handleSearch, setSearchQuery, setSearchResults, setIsSearchVisible],
  );

  const getProductName = (product: ProductProjection): string => {
    const name = product.name['en-GB'] || 'Без названия';
    return name || 'Без названия';
  };

  return (
    <>
      <div className="search">
        <MyInput
          className={`searchField ${isSearchVisible ? 'searchVis' : ''}`}
          type="text"
          placeholder="Поиск..."
          ref={searchInputRef}
          value={searchQuery}
          onChange={handleInputChange}
        />
        <div className="searchBlock" style={{ position: 'relative' }} ref={searchRef}>
          <button className="user-btns_btn searchBtn" onClick={toggleSearchVisibility}>
            <img className="user-btns_btn__icon" src={logoSearch} alt="Поиск" />
          </button>
        </div>
      </div>
      {isSearchVisible && (
        <div className="searchProductList">
          {searchResults.map((product, index) => (
            <div key={index}>
              <p>{getProductName(product)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchBtn;
