import './selectCountry.scss';
import { useState } from 'react';
import Select, { OnChangeValue, PropsValue } from 'react-select';

function SelectCountry() {
  type InewValue = {
    value: string;
    label: string;
    className: string;
    pattern: string;
  };
  const options: InewValue[] = [
    { value: 'Austria', label: 'Austria', className: 'austria', pattern: '^\\d{4}$' },
    { value: 'Belarus', label: 'Belarus', className: 'belarus', pattern: '^\\d{6}$' },
    { value: 'Poland', label: 'Poland', className: 'poland', pattern: '^\\d{2}-\\d{3}$' },
    { value: 'Russia', label: 'Russia', className: 'russia', pattern: '^\\d{6}$' },
    { value: 'Serbia', label: 'Serbia', className: 'serbia', pattern: '^\\d{5}$' },
    { value: 'France', label: 'France', className: 'france', pattern: '^\\d{5}$' },
  ];
  const [currentCountry, setCurrentCountry] = useState('');

  const getValueCountry = (): PropsValue<InewValue> | undefined => {
    return currentCountry ? options.find((country) => country.value === currentCountry) : undefined;
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
      options={options}
      onChange={onChange}
      value={getValueCountry()}
      isSearchable={true}
      placeholder="Select country"
      className={'select'}
      classNamePrefix={'custom-select'}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
}

export default SelectCountry;
