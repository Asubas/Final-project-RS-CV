import React, { useState, useEffect, useCallback } from 'react';
import Select, { OnChangeValue, PropsValue } from 'react-select';
import { InewValue } from '../../types/typeRegistrationPage';
import { countries, customStyles } from '../../constants/constantsRegistrationPage';
import getShippingOrBillingContainer from '../accordanceCountryToPostalCode/getShippingOrBillingContainer';

export let cont: string;

interface SelectCountryProps {
  isDisabled: boolean;
}

const SelectCountry: React.FC<SelectCountryProps> = ({ isDisabled }) => {
  const [currentCountry, setCurrentCountry] = useState<string>('');
  const [currentContainer, setCurrentContainer] = useState<HTMLElement | null>(null);

  const getValueCountry = (): PropsValue<InewValue> | undefined => {
    return currentCountry
      ? countries.find((country) => country.value === currentCountry)
      : undefined;
  };

  const handleClick = useCallback((event: Event) => {
    let element = event.target as HTMLElement | null;
    while (
      element &&
      !element.classList.contains('registration-form_shipping-address-block') &&
      !element.classList.contains('registration-form_billing-address-block')
    ) {
      element = element.parentElement;
    }

    if (element) {
      const className = element.className;
      cont = getShippingOrBillingContainer(className);
      setCurrentContainer(element);
    }
  }, []);

  const onChange = (newValue: OnChangeValue<InewValue, boolean>) => {
    if (!currentContainer) return;

    const postalCodeContainer = currentContainer;
    const postalCodeInput = postalCodeContainer.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    if (!postalCodeInput) return;

    const newCountry = newValue as InewValue;
    setCurrentCountry(newCountry.value);

    if (currentContainer.classList.contains('registration-form_shipping-address-block')) {
      localStorage.setItem('countryShipping', newCountry.value);
      localStorage.setItem('patternShipping', newCountry.pattern);
      localStorage.setItem('countryCodeShipping', newCountry.countryCode);
    } else if (currentContainer.classList.contains('registration-form_billing-address-block')) {
      localStorage.setItem('countryBilling', newCountry.value);
      localStorage.setItem('patternBilling', newCountry.pattern);
      localStorage.setItem('countryCodeBilling', newCountry.countryCode);
    }

    postalCodeInput.value = '';
    postalCodeInput.removeAttribute('style');
    const spanElement = postalCodeContainer.querySelector('span') as HTMLSpanElement;
    if (spanElement) {
      spanElement.innerText = '';
    }
    postalCodeInput.pattern = String(newCountry.pattern);
  };

  useEffect(() => {
    const handleDocumentClick = (event: Event) => {
      handleClick(event);
    };

    document.addEventListener('click', handleDocumentClick, { passive: true });
    document.addEventListener('touchend', handleDocumentClick, { passive: true });
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('touchend', handleDocumentClick);
    };
  }, [handleClick]);

  return (
    <Select
      className="test"
      options={countries}
      onChange={onChange}
      value={getValueCountry()}
      isSearchable={true}
      placeholder="Select country"
      styles={customStyles}
      isDisabled={isDisabled}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export default SelectCountry;
