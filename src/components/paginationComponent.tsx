import React from 'react';
import { PaginationProps } from '../interfaces/pagination';

const PaginationComponent = (props: PaginationProps) => {
  const { nav = null, disable, onNextPageClick, onPrevPageClick } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };
  if (nav) {
    return (
      <>
        <button
          className="collection-page_pagination-buttonPrev"
          type="button"
          onClick={handlePrevPageClick}
          disabled={disable.left}
        >
          {`${nav.current}`}
        </button>
        <button
          className="collection-page_pagination-buttonNext"
          type="button"
          onClick={handleNextPageClick}
          disabled={disable.right}
        >
          {`${nav.total}`}
        </button>
      </>
    );
  }
};

export default React.memo(PaginationComponent);
