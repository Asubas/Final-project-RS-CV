import './filtersSection.scss';
import { useLocation } from 'react-router-dom';
import { SelectCountry } from './selectCountry/selectCountry';
import { SelectFlavour } from './selectFlavour/selectFlavour';
import MyButton from '../../../../components/button/button';
import { useState } from 'react';

const Filters = () => {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedFlavour, setSelectedFlavour] = useState<string | null>(null);

  const resetCountry = () => {
    setSelectedCountry(null);
  };

  const resetFlavour = () => {
    setSelectedFlavour(null);
  };

  const resetAll = () => {
    resetCountry();
    resetFlavour();
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
          <SelectCountry selectedCountry={selectedCountry} onCountryChange={handleCountryChange} />
          <SelectFlavour selectedFlavour={selectedFlavour} onFlavourChange={handleFlavourChange} />
          <MyButton type="button" className="btn_black" onClick={resetAll}>
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
