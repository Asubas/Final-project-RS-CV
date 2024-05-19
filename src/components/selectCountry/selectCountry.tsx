import { useState } from 'react';
import Select, { OnChangeValue, PropsValue } from 'react-select';
import { InewValue } from '../../types/typeRegistrationPage';
import { countries, customStyles } from '../../constants/constantsRegistrationPage';
import getShippingOrBillingContainer from '../accordanceCountryToPostalCode/getShippingOrBillingContainer';
export let cont: string;
function SelectCountry() {
  const [currentCountry, setCurrentCountry] = useState('');

  const getValueCountry = (): PropsValue<InewValue> | undefined => {
    return currentCountry
      ? countries.find((country) => country.value === currentCountry)
      : undefined;
  };

  let currentContainer: HTMLElement;
  const handleClick = (event: Event) => {
    let element = event.target || null;
    while (
      (element as HTMLElement).className !== 'registration-form_shipping-address-block' ||
      (element as HTMLElement).className !== 'registration-form_billing-address-block'
    ) {
      element = (element as HTMLElement).parentElement;
      if (
        (element as HTMLElement).className === 'registration-form_shipping-address-block' ||
        (element as HTMLElement).className === 'registration-form_billing-address-block'
      ) {
        const className = (element as HTMLElement).className;
        cont = getShippingOrBillingContainer(className);
        return (currentContainer = element as HTMLElement);
      }
    }
  };

  const onChange = (newValue: OnChangeValue<InewValue, boolean>) => {
    if (newValue) {
      setCurrentCountry((newValue as InewValue).value);
      localStorage.setItem('country', (newValue as InewValue).value);
      localStorage.setItem('pattern', (newValue as InewValue).pattern);
      localStorage.setItem('countryCode', (newValue as InewValue).countryCode)
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
      className="test"
      options={countries}
      onChange={onChange}
      value={getValueCountry()}
      isSearchable={true}
      placeholder="Select country"
      styles={customStyles}
      components={{
        IndicatorSeparator: () => null,
      }}
      onMenuOpen={() => {
        document.addEventListener('click', handleClick);
      }}
      onMenuClose={() => {
        document.removeEventListener('click', handleClick);
      }}
    />
  );
}

export default SelectCountry;
