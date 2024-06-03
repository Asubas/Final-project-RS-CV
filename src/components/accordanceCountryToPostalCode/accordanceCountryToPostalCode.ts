import { PropsValue, SingleValue } from 'react-select';
import { cont } from '../selectCountry/selectCountry';
import { InewValue } from '../../types/typeRegistrationPage';
import { useCallback, useState } from 'react';
import { countries } from '../../constants/constantsRegistrationPage';

const validatePostalCode = (countryCode: string) => {
  return (postalCode: string) => {
    const country = countries.find((country) => country.pattern === countryCode);
    if (!country) {
      return 'Invalid country code';
    }
    const regex = new RegExp(country.pattern);
    if (!regex.test(postalCode)) {
      return `Invalid postal code for ${country.label}`;
    }
    return true;
  };
};

export default validatePostalCode;
// function AccordanceCountryToPostalCode() {

//   let currentCountry: string | '';
//   const currentContainerClassName = cont;
//   if (currentContainerClassName !== null) {
//     const currentElementContainer = document.querySelector(
//       '.' + currentContainerClassName,
//     ) as HTMLElement;
//     const currentElementPostalCodeInput = currentElementContainer.children[3]
//       .children[0] as HTMLInputElement;

//     if (currentElementContainer.className === 'registration-form_shipping-address-block') {
//       currentCountry = localStorage.getItem('countryShipping') || '';
//       switch (currentCountry) {
//         case 'Austria': {
//           // currentElementPostalCodeInput.pattern = '^\\d{4}$';
//           const matchesAustria = /^\d{4}$/.test(currentElementPostalCodeInput.value);
//           if (matchesAustria === false) {
//             currentElementPostalCodeInput.setAttribute('style', 'border: 1px solid red');
//             return 'Must be contain 4 numbers';
//           }
//           currentElementPostalCodeInput.removeAttribute('style');
//           return;
//         }
//         case 'Belarus':
//         case 'Russia': {
//           // currentElementPostalCodeInput.pattern = '^d{6}$';
//           const matchesBelRus = /^\d{6}$/.test(currentElementPostalCodeInput.value);
//           if (matchesBelRus === false) {
//             currentElementPostalCodeInput.setAttribute('style', 'border: 1px solid red');
//             return 'Must be contain 6 numbers';
//           }
//           currentElementPostalCodeInput.removeAttribute('style');
//           return;
//         }

//         case 'Poland': {
//           // currentElementPostalCodeInput.pattern = '^\\d{2}-\\d{3}$';
//           const matchesPoland = /^\d{2}-\d{3}$/.test(currentElementPostalCodeInput.value);
//           if (matchesPoland === false) {
//             currentElementPostalCodeInput.setAttribute('style', 'border: 1px solid red');
//             return 'Must be have format 00-000';
//           }
//           currentElementPostalCodeInput.removeAttribute('style');
//           return;
//         }

//         case 'Serbia':
//         case 'France': {
//           // currentElementPostalCodeInput.pattern = '^^\\d{5}$';
//           const matchesSerbFrance = /^\d{5}$/.test(currentElementPostalCodeInput.value);
//           if (matchesSerbFrance === false) {
//             currentElementPostalCodeInput.setAttribute('style', 'border: 1px solid red');
//             return 'Must be contain 5 numbers';
//           }
//           currentElementPostalCodeInput.removeAttribute('style');
//           return;
//         }

//         default:
//           currentElementPostalCodeInput.removeAttribute('style');
//           currentElementPostalCodeInput.value = '';
//           return;
//       }
//     } else if (currentElementContainer.className === 'registration-form_billing-address-block') {
//       currentCountry = localStorage.getItem('countryBilling') || '';
//       switch (currentCountry) {
//         case 'Austria': {
//           // currentElementPostalCodeInput.pattern = '^\\d{4}$';
//           const matchesAustria = /^\d{4}$/.test(currentElementPostalCodeInput.value);
//           if (matchesAustria === false) {
//             currentElementPostalCodeInput.setAttribute('style', 'border: 1px solid red');
//             return 'Must be contain 4 numbers';
//           }
//           currentElementPostalCodeInput.removeAttribute('style');
//           return;
//         }
//         case 'Belarus':
//         case 'Russia': {
//           // currentElementPostalCodeInput.pattern = '^\\d{6}$';
//           const matchesBelRus = /^\d{6}$/.test(currentElementPostalCodeInput.value);
//           if (matchesBelRus === false) {
//             currentElementPostalCodeInput.setAttribute('style', 'border: 1px solid red');
//             return 'Must be contain 6 numbers';
//           }
//           currentElementPostalCodeInput.removeAttribute('style');
//           return;
//         }

//         case 'Poland': {
//           // currentElementPostalCodeInput.pattern = '^\\d{2}-\\d{3}$';
//           const matchesPoland = /^\d{2}-\d{3}$/.test(currentElementPostalCodeInput.value);
//           if (matchesPoland === false) {
//             currentElementPostalCodeInput.setAttribute('style', 'border: 1px solid red');
//             return 'Must be have format 00-000';
//           }
//           currentElementPostalCodeInput.removeAttribute('style');
//           return;
//         }

//         case 'Serbia':
//         case 'France': {
//           // currentElementPostalCodeInput.pattern = '^^\\d{5}$';
//           const matchesSerbFrance = /^\d{5}$/.test(currentElementPostalCodeInput.value);
//           if (matchesSerbFrance === false) {
//             currentElementPostalCodeInput.setAttribute('style', 'border: 1px solid red');
//             return 'Must be contain 5 numbers';
//           }
//           currentElementPostalCodeInput.removeAttribute('style');
//           return;
//         }

//         default:
//           currentElementPostalCodeInput.removeAttribute('style');
//           currentElementPostalCodeInput.value = '';
//           return;
//       }
//     }
//   }
// }

// export default AccordanceCountryToPostalCode;
