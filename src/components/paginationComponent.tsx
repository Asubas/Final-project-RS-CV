import { PaginationProps } from '../interfaces/pagination';

export const PaginationComponent = (props: PaginationProps) => {
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
          {`${nav.current === 1 ? (nav.current = 1) : nav.current - 1}`}
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
