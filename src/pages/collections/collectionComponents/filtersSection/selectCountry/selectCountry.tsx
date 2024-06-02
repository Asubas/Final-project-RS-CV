import React, { useCallback, useContext, useState } from 'react';
import MyInput from '../../../../../components/input/input';
import { SelectCountryProps } from '../../../../../interfaces/interfaces';
import { ProductsPageContext } from '../../../context';
import { filterCocoaCountry, filterTeaCountry } from '../../../../../constants/filtersRadio';
import { useLocation } from 'react-router-dom';

function SelectCountry({ selectedCountry, onCountryChange }: SelectCountryProps) {
  const { setResetFilters, handleFetch, setSelectedCountry, setCurrentPage } =
    useContext(ProductsPageContext);
  const [checkedCountry, setCheckedCountry] = useState(selectedCountry);

  const handleCountryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setResetFilters(false);
      onCountryChange(event.target.value);
      setSelectedCountry(event.target.value);
      setCurrentPage(1);
      handleFetch(1);
      setCheckedCountry(event.target.value);
    },
    [setResetFilters, onCountryChange, setSelectedCountry, setCurrentPage, handleFetch],
  );

  const { pathname } = useLocation();
  const pathParts = pathname.split('/');
  let arrSelectedProduct: string[] = [];
  if (pathParts[2] === 'tea') arrSelectedProduct = filterTeaCountry;
  if (pathParts[2] === 'coffee') arrSelectedProduct = [];
  if (pathParts[2] === 'cocoa') arrSelectedProduct = filterCocoaCountry;

  return pathParts[2] !== 'coffee' ? (
    <ul className="filters-list">
      <li>Select country</li>
      {arrSelectedProduct.map((element, index) => (
        <li key={index} className="filters-list__item">
          <label
            htmlFor={element}
            className={checkedCountry === element ? 'radio-button--checked' : ''}
          >
            {element}
            <MyInput
              type="radio"
              name="country"
              id={element}
              value={element}
              onChange={handleCountryChange}
            />
          </label>
        </li>
      ))}
    </ul>
  ) : null;
}

export { SelectCountry };
