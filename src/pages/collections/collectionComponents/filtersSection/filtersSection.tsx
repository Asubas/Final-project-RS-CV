import './filtersSection.scss';
import { useLocation } from 'react-router-dom';
import { SelectCountry } from './selectCountry/selectCountry';
import { SelectFlavour } from './selectFlavour/selectFlavour';
import MyButton from '../../../../components/button/button';
import { useCallback, useContext } from 'react';
import { ProductsPageContext } from '../../context';

const Filters = () => {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/');
  const { handleFetch, setResetFilters, setCurrentPage, setSelectedFlavour, setSelectedCountry } =
    useContext(ProductsPageContext);

  const resetAll = useCallback(() => {
    setResetFilters(true);
    setCurrentPage(1);
    handleFetch(1);
    setSelectedCountry('');
    setSelectedFlavour('');
    // setResetFilters(false);
  }, [setResetFilters, setCurrentPage, handleFetch, setSelectedFlavour, setSelectedCountry]);

  const resetCountry = () => {
    setSelectedCountry('');
  };

  const resetFlavour = () => {
    setSelectedFlavour('');
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const handleFlavourChange = (value: string) => {
    setSelectedFlavour(value);
  };

  return (
    <>
      {pathParts[2] === 'tea' || pathParts[2] === 'coffee' ? (
        <section className="collection-page_content-filters">
          <SelectCountry onCountryChange={handleCountryChange} selectedCountry={''} />
          <SelectFlavour onFlavourChange={handleFlavourChange} selectedFlavour={''} />
          <MyButton
            type="button"
            className="btn_black"
            onClick={() => {
              resetAll();
              resetCountry();
              resetFlavour();
            }}
          >
            Reset all
          </MyButton>
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};

export { Filters };
