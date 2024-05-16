import { useState } from 'react';
import Select, { OnChangeValue, PropsValue } from 'react-select';
import { InewValue } from '../../types/typeRegistrationPage';
import { countries, customStyles } from '../../constants/constantsRegistrationPage';

function SelectCountry() {
  const [currentCountry, setCurrentCountry] = useState('');

  const getValueCountry = (): PropsValue<InewValue> | undefined => {
    return currentCountry
      ? countries.find((country) => country.value === currentCountry)
      : undefined;
  };

  const onChange = (newValue: OnChangeValue<InewValue, boolean>) => {
    if (newValue) {
      setCurrentCountry((newValue as InewValue).value);
      localStorage.setItem('country', (newValue as InewValue).value);
      localStorage.setItem('pattern', (newValue as InewValue).pattern);
      const postalCodeInput = document.querySelector(
        '.registration-form_postal-code-input',
      ) as HTMLInputElement;
      const postalCodeContainer = document.querySelector(
        '.registration-form_postal-code-input-container',
      ) as HTMLDivElement;
      if (postalCodeInput) {
        postalCodeInput.value = '';
        postalCodeInput.removeAttribute('style');
        if (postalCodeContainer.children[1] as HTMLSpanElement) {
          (postalCodeContainer.children[1] as HTMLSpanElement).innerText = '';
        }
        postalCodeInput.pattern = String(localStorage.getItem('pattern'));
      }
    }
  };

  return (
    <Select
      options={countries}
      onChange={onChange}
      value={getValueCountry()}
      isSearchable={true}
      placeholder="Select country"
      styles={customStyles}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
}

export default SelectCountry;
