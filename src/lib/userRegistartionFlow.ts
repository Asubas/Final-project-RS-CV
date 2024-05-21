import registerUserWithDefaultBillingAddress from './registerUserWithDefaultBillingAddress';
import registerUserWithDefaultShippingAddress from './registerUserWithDefaultShippingAddress';
import registerUserWithDefaultShippingAndDefaultBillingAddresses from './registerUserWithDefaultShippingAndDefaultBillingAddresses';
import registerUserWithoutDefaultAddresses from './registerUserWithoutDefaultAddresses';

export default async function registerCustomer() {
  const promises = [];
  const checkSetDefaultShippingAddress = localStorage.getItem('setDefaultShippingAddress') || '';
  const checkSetDefaultBillingAddress = localStorage.getItem('setDefaultBillingAddress') || '';
  try {
    if (checkSetDefaultShippingAddress !== 'true' && checkSetDefaultBillingAddress !== 'true') {
      promises.push(registerUserWithoutDefaultAddresses());
    } else if (
      checkSetDefaultShippingAddress === 'true' &&
      checkSetDefaultBillingAddress === 'true'
    ) {
      promises.push(registerUserWithDefaultShippingAndDefaultBillingAddresses());
    } else if (
      checkSetDefaultBillingAddress !== 'true' &&
      checkSetDefaultShippingAddress === 'true'
    ) {
      promises.push(registerUserWithDefaultShippingAddress());
    } else if (
      checkSetDefaultBillingAddress === 'true' &&
      checkSetDefaultShippingAddress !== 'true'
    ) {
      promises.push(registerUserWithDefaultBillingAddress());
    }
    return await Promise.race(promises);
  } catch {
    return null;
  }
}
