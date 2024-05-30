import { useCallback, useContext } from 'react';
import MyInput from '../../../../../components/input/input';
import { SelectCountryProps } from '../../../../../interfaces/interfaces';
import { ProductsPageContext } from '../../../context';

function SelectCountry({ selectedCountry, onCountryChange }: SelectCountryProps) {
  const { handleFetch, setSelectedCountry, setCurrentPage } = useContext(ProductsPageContext);
  const handleCountryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onCountryChange(event.target.value);
      setSelectedCountry(event.target.value);
      setCurrentPage(1);
      handleFetch(1);
    },
    [onCountryChange, setSelectedCountry, setCurrentPage, handleFetch],
  );

  return (
    <ul className="filters-list">
      <li>Select country</li>
      <li className="filters-list__item">
        <label htmlFor="Armenia">
          Armenia
          <MyInput
            type="radio"
            name="country"
            id="Armenia"
            value="Armenia"
            checked={selectedCountry === 'Armenia'}
            onChange={handleCountryChange}
          />
        </label>
      </li>
      <li className="filters-list__item">
        <label htmlFor="China">
          China
          <MyInput
            type="radio"
            name="country"
            id="China"
            value="China"
            checked={selectedCountry === 'China'}
            onChange={handleCountryChange}
          />
        </label>
      </li>
      <li className="filters-list__item">
        <label htmlFor="India">
          India
          <MyInput
            type="radio"
            name="country"
            id="India"
            value="India"
            checked={selectedCountry === 'India'}
            onChange={handleCountryChange}
          />
        </label>
      </li>
      <li className="filters-list__item">
        <label htmlFor="Japan">
          Japan
          <MyInput
            type="radio"
            name="country"
            id="Japan"
            value="Japan"
            checked={selectedCountry === 'Japan'}
            onChange={handleCountryChange}
          />
        </label>
      </li>
      <li className="filters-list__item">
        <label htmlFor="Morocco">
          Morocco
          <MyInput
            type="radio"
            name="country"
            id="Morocco"
            value="Morocco"
            checked={selectedCountry === 'Morocco'}
            onChange={handleCountryChange}
          />
        </label>
      </li>
      <li className="filters-list__item">
        <label htmlFor="Russia">
          Russia
          <MyInput
            type="radio"
            name="country"
            id="Russia"
            value="Russia"
            checked={selectedCountry === 'Russia'}
            onChange={handleCountryChange}
          />
        </label>
      </li>
      <li className="filters-list__item">
        <label htmlFor="Sri Lanka">
          Sri Lanka
          <MyInput
            type="radio"
            name="country"
            id="Sri Lanka"
            value="Sri Lanka"
            checked={selectedCountry === 'Sri Lanka'}
            onChange={handleCountryChange}
          />
        </label>
      </li>
    </ul>
  );
}

export { SelectCountry };
