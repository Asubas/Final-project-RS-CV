import registerUserWithDefaultBillingAddress from './registerUserWithDefaultBillingAddress';
import registerUserWithDefaultShippingAddress from './registerUserWithDefaultShippingAddress';
import registerUserWithDefaultShippingAndDefaultBillingAddresses from './registerUserWithDefaultShippingAndDefaultBillingAddresses';
import registerUserWithoutDefaultAddresses from './registerUserWithoutDefaultAddresses';

// const navigate = useNavigate();

export default async function registerCustomer() {
  const span = document.querySelector('.error-message') as HTMLSpanElement;
  if (span.textContent !== '') {
    span.innerText = '';
  }

  const checkSetDefaultShippingAddress = localStorage.getItem('setDefaultShippingAddress') || '';
  const checkSetDefaultBillingAddress = localStorage.getItem('setDefaultBillingAddress') || '';
  // const checkSetSameAddress = localStorage.getItem('setSameAddress') || '';
  if (checkSetDefaultShippingAddress !== 'true' && checkSetDefaultBillingAddress !== 'true') {
    registerUserWithoutDefaultAddresses();
  } else if (
    checkSetDefaultShippingAddress === 'true' &&
    checkSetDefaultBillingAddress === 'true'
  ) {
    registerUserWithDefaultShippingAndDefaultBillingAddresses();
  } else if (
    checkSetDefaultBillingAddress !== 'true' &&
    checkSetDefaultShippingAddress === 'true'
  ) {
    registerUserWithDefaultShippingAddress();
  } else if (
    checkSetDefaultBillingAddress === 'true' &&
    checkSetDefaultShippingAddress !== 'true'
  ) {
    registerUserWithDefaultBillingAddress();
  }
}
