import { AddressCust } from '../../interfaces/interfaces';
import getUserObjectRegistrationPage from './getUserObjectRegistrationPage';

function getUserRequestObject() {
  getUserObjectRegistrationPage();
  const addressesShipping: AddressCust = {
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    streetName: localStorage.getItem('streetShipping') || '',
    postalCode: localStorage.getItem('postalCodeShipping') || '',
    city: localStorage.getItem('countryShipping') || '',
    country: localStorage.getItem('countryCodeShipping') || '',
  };

  const addressesBilling: AddressCust = {
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    streetName: localStorage.getItem('streetBilling') || '',
    postalCode: localStorage.getItem('postalCodeBilling') || '',
    city: localStorage.getItem('countryBilling') || '',
    country: localStorage.getItem('countryCodeBilling') || '',
  };

  const checkSetDefaultShippingAddress = localStorage.getItem('setDefaultShippingAddress') || '';
  const checkSetDefaultBillingAddress = localStorage.getItem('setDefaultBillingAddress') || '';
  const checkSetSameAddresses = localStorage.getItem('setSameAddress') || '';
  if (checkSetSameAddresses === 'true') {
    return {
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      password: localStorage.getItem('password') || '',
      addresses: [addressesShipping],
      defaultShippingAddress: 0,
      defaultBillingAddress: 0,
    };
  }
  if (checkSetDefaultShippingAddress !== 'true' && checkSetDefaultBillingAddress !== 'true') {
    return {
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      password: localStorage.getItem('password') || '',
      addresses: [addressesShipping, addressesBilling],
    };
  } else if (
    checkSetDefaultShippingAddress === 'true' &&
    checkSetDefaultBillingAddress === 'true'
  ) {
    return {
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      password: localStorage.getItem('password') || '',
      addresses: [addressesShipping, addressesBilling],
      defaultShippingAddress: 0,
      defaultBillingAddress: 1,
    };
  } else if (
    checkSetDefaultBillingAddress !== 'true' &&
    checkSetDefaultShippingAddress === 'true'
  ) {
    return {
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      password: localStorage.getItem('password') || '',
      addresses: [addressesShipping, addressesBilling],
      defaultShippingAddress: 0,
    };
  } else if (
    checkSetDefaultBillingAddress === 'true' &&
    checkSetDefaultShippingAddress !== 'true'
  ) {
    return {
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      password: localStorage.getItem('password') || '',
      addresses: [addressesShipping, addressesBilling],
      defaultBillingAddress: 1,
    };
  }
}

export default getUserRequestObject;
