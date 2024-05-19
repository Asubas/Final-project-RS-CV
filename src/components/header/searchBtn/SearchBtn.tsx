import React, { useEffect, useRef, useState } from 'react';
import logoSearch from '../../../assets/svg/icon-search.svg';

function SearchBtn() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
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
    <div className="searchBlock" style={{ position: 'relative' }} ref={searchRef}>
      <button className="user-btns_btn searchBtn" onClick={toggleSearchVisibility}>
        <img className="user-btns_btn__icon" src={logoSearch} alt="Search" />
      </button>
      <input
        className={`searchField ${isSearchVisible ? 'searchVis' : ''}`}
        type="search"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBtn;
