import './seatchBtn.scss';
import { useRef, useState, useCallback } from 'react';
import logoSearch from '../../../assets/svg/icon-search.svg';
import MyInput from '../../input/input';
import { getProductList } from '../../../pages/collections/requestsToProducts/productList';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getProductById } from '../../../lib/getProductInfo';
import { useNavigate } from 'react-router-dom';

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

  const handleSearch = useCallback(
    (query: string) => {
      getProductList(9, 0, '', 'price desc', '', '', false, query).then((response) => {
        setSearchResults(response.results);
      });
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
    return product.name['en-GB'] || 'Без названия';
  };

  const navigate = useNavigate();

  const handleClick = (id: string) => {
    getProductById(id).then((res) => {
      if (res.statusCode === 200) {
        const path = res.body.masterData.current.slug['en-GB'];
        let pathCategories = '';
        if (
          `${res.body.masterData.current.categories[0].id}` ===
          '86625d6c-fcb0-4f8d-a58f-9f67cc8b13a4'
        ) {
          pathCategories = 'coffee';
        } else if (
          `${res.body.masterData.current.categories[0].id}` ===
          'caf2b3c5-799e-4d6e-860c-363bf2d6542b'
        ) {
          pathCategories = 'tea';
        } else if (
          `${res.body.masterData.current.categories[0].id}` ===
          '7a2657a3-ae01-452b-8e33-edb51503dceb'
        ) {
          pathCategories = 'cocoa';
        }
        console.log(res.body.masterData);
        navigate(
          `/collection/${pathCategories}/${res.body?.masterData?.current?.variants?.[0]?.attributes?.[5]?.value}/${path}`,
          {
            state: res.body,
          },
        );
      }
    });
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
          onChange={(event) => {
            handleInputChange(event);
          }}
          onFocus={() => setIsSearchVisible(true)}
          onBlur={() => {
            if (searchQuery === '') {
              setIsSearchVisible(false);
            }
          }}
        />
        <div className="searchBlock" style={{ position: 'relative' }} ref={searchRef}>
          <button className="user-btns_btn searchBtn" onClick={toggleSearchVisibility}>
            <img className="user-btns_btn__icon" src={logoSearch} alt="Поиск" />
          </button>
        </div>
      </div>
      {isSearchVisible && (
        <div className="searchProductList">
          {searchResults.map((product) => (
            <div key={product.id} onClick={() => handleClick(product.id)}>
              <p>{getProductName(product)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchBtn;
