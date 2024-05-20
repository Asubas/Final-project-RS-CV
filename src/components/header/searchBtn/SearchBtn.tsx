import { useEffect, useRef, useState } from 'react';
import logoSearch from '../../../assets/svg/icon-search.svg';
import MyInput from '../../input/input';

function SearchBtn() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node) &&
      searchInputRef.current !== (event.target as HTMLInputElement)
    ) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <MyInput
        className={`searchField ${isSearchVisible ? 'searchVis' : ''}`}
        type="search"
        placeholder="Search..."
        ref={searchInputRef}
      />
      <div className="searchBlock" style={{ position: 'relative' }} ref={searchRef}>
        <button className="user-btns_btn searchBtn" onClick={toggleSearchVisibility}>
          <img className="user-btns_btn__icon" src={logoSearch} alt="Search" />
        </button>
      </div>
    </>
  );
}

export default SearchBtn;
