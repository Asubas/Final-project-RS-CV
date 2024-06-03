import { AddressCust } from '../../interfaces/interfaces';
import getUserObjectRegistrationPage from './getUserObjectRegistrationPage';

function getUserRequestObject() {
  getUserObjectRegistrationPage();
  const addressesShipping: AddressCust = {
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    streetName: localStorage.getItem('streetShipping') || '',
    postalCode: localStorage.getItem('postalCodeShipping') || '',
    city: localStorage.getItem('cityShipping') || '',
    country: localStorage.getItem('countryCodeShipping') || '',
  };

  const addressesBilling: AddressCust = {
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    streetName: localStorage.getItem('streetBilling') || '',
    postalCode: localStorage.getItem('postalCodeBilling') || '',
    city: localStorage.getItem('cityBilling') || '',
    country: localStorage.getItem('countryCodeBilling') || '',
  };

  const checkSetDefaultShippingAddress = localStorage.getItem('setDefaultShippingAddress') || '';
  const checkSetDefaultBillingAddress = localStorage.getItem('setDefaultBillingAddress') || '';
  const checkSetSameAddresses = localStorage.getItem('setSameAddress') || '';
  if (
    checkSetSameAddresses === 'true' &&
    checkSetDefaultShippingAddress === 'true' &&
    checkSetDefaultBillingAddress === 'true'
  ) {
    return {
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      password: localStorage.getItem('password') || '',
      dateOfBirth: localStorage.getItem('date') || '',
      addresses: [addressesShipping],
      defaultShippingAddress: 0,
      defaultBillingAddress: 0,
    };
  } else if (
    checkSetSameAddresses === 'true' &&
    checkSetDefaultShippingAddress === 'true' &&
    checkSetDefaultBillingAddress !== 'true'
  ) {
    return {
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      password: localStorage.getItem('password') || '',
      dateOfBirth: localStorage.getItem('date') || '',
      addresses: [addressesShipping],
      defaultShippingAddress: 0,
    };
  } else if (
    checkSetSameAddresses === 'true' &&
    checkSetDefaultShippingAddress !== 'true' &&
    checkSetDefaultBillingAddress !== 'true'
  ) {
    return {
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      password: localStorage.getItem('password') || '',
      dateOfBirth: localStorage.getItem('date') || '',
      addresses: [addressesShipping],
    };
  } else if (
    checkSetSameAddresses !== 'true' &&
    checkSetDefaultShippingAddress !== 'true' &&
    checkSetDefaultBillingAddress !== 'true'
  ) {
    return {
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      password: localStorage.getItem('password') || '',
      dateOfBirth: localStorage.getItem('date') || '',
      addresses: [addressesShipping, addressesBilling],
    };
  } else if (
    checkSetSameAddresses !== 'true' &&
    checkSetDefaultShippingAddress === 'true' &&
    checkSetDefaultBillingAddress === 'true'
  ) {
    return {
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      password: localStorage.getItem('password') || '',
      dateOfBirth: localStorage.getItem('date') || '',
      addresses: [addressesShipping, addressesBilling],
      defaultShippingAddress: 0,
      defaultBillingAddress: 1,
    };
  } else if (
    checkSetSameAddresses !== 'true' &&
    checkSetDefaultBillingAddress !== 'true' &&
    checkSetDefaultShippingAddress === 'true'
  ) {
    return {
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      password: localStorage.getItem('password') || '',
      dateOfBirth: localStorage.getItem('date') || '',
      addresses: [addressesShipping, addressesBilling],
      defaultShippingAddress: 0,
    };
  } else if (
    checkSetSameAddresses !== 'true' &&
    checkSetDefaultBillingAddress === 'true' &&
    checkSetDefaultShippingAddress !== 'true'
  ) {
    return {
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      password: localStorage.getItem('password') || '',
      dateOfBirth: localStorage.getItem('date') || '',
      addresses: [addressesShipping, addressesBilling],
      defaultBillingAddress: 1,
    };
  }
}

export default getUserRequestObject;
