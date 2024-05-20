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
    while ((element as HTMLElement).className !=='registration-form_shipping-address-block' || (element as HTMLElement).className !== 'registration-form_billing-address-block') {
      element = (element as HTMLElement).parentElement;
      if ((element as HTMLElement).className ==='registration-form_shipping-address-block' || (element as HTMLElement).className === 'registration-form_billing-address-block') {
        const className = (element as HTMLElement).className
       cont = getShippingOrBillingContainer(className);
        return currentContainer = element as HTMLElement  
      } 
    }
  };
 
 

  const onChange = (newValue: OnChangeValue<InewValue, boolean> ) => {

    const postalCodeContainer = (currentContainer as HTMLElement);
    const postalCodeInput = (((currentContainer as HTMLElement).childNodes[3] as HTMLElement).children[0] as HTMLInputElement);

      if(currentContainer.className === 'registration-form_shipping-address-block'){
        if (newValue) {
          setCurrentCountry((newValue as InewValue).value);
          localStorage.setItem('countryShipping', (newValue as InewValue).value);
          localStorage.setItem('patternShipping', (newValue as InewValue).pattern);

          if (postalCodeInput) {
            postalCodeInput.value = '';
            postalCodeInput.removeAttribute('style');
            if (postalCodeContainer.children[3].childNodes[1] as HTMLSpanElement) {
              (postalCodeContainer.children[3].childNodes[1] as HTMLSpanElement).innerText = '';
            }
            postalCodeInput.pattern = String((newValue as InewValue).pattern);
          }
        }
       
      }

      if(currentContainer.className === 'registration-form_billing-address-block'){
        if (newValue) {
          setCurrentCountry((newValue as InewValue).value);
          localStorage.setItem('countryBilling', (newValue as InewValue).value);
          localStorage.setItem('patternBilling', (newValue as InewValue).pattern);

          if (postalCodeInput) {
            postalCodeInput.value = '';
            postalCodeInput.removeAttribute('style');
            if (postalCodeContainer.children[3].childNodes[1] as HTMLSpanElement) {
              (postalCodeContainer.children[3].childNodes[1] as HTMLSpanElement).innerText = '';
            }
            postalCodeInput.pattern = String((newValue as InewValue).pattern);
          }
      }
    }
  };

  return (
    <Select
      className='test'
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
