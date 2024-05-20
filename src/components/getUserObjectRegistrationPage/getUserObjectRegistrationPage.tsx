import { countries } from '../../constants/constantsRegistrationPage';

export function getUserObjectRegistrationPage() {
  const shippingContainer = document.querySelector(
    '.registration-form_shipping-address-block',
  ) as HTMLElement;

  const cityInputShipping = shippingContainer.children[1].children[0] as HTMLInputElement;
  const streetInputShipping = shippingContainer.children[2].children[0] as HTMLInputElement;
  const postalCodeInputShipping = shippingContainer.children[3].children[0] as HTMLInputElement;

  const billingContainer = document.querySelector(
    '.registration-form_billing-address-block',
  ) as HTMLElement;

  const cityInputBilling = billingContainer.children[1].children[0] as HTMLInputElement;
  const streetInputBilling = billingContainer.children[2].children[0] as HTMLInputElement;
  const postalCodeInputBilling = billingContainer.children[3].children[0] as HTMLInputElement;

  console.log(cityInputBilling.value);
  console.log(streetInputBilling.value);
  console.log(postalCodeInputBilling.value);

  const firstNameInput = document.querySelector(
    '.registration-form_first-name-input',
  ) as HTMLInputElement;
  const lastNameInput = document.querySelector(
    '.registration-form_last-name-input',
  ) as HTMLInputElement;
  const emailInput = document.querySelector('.registration-form_email-input') as HTMLInputElement;
  const passwordInput = document.querySelector(
    '.registration-form_password-input',
  ) as HTMLInputElement;

  localStorage.setItem('email', emailInput.value);
  localStorage.setItem('firstName', firstNameInput.value);
  localStorage.setItem('lastName', lastNameInput.value);
  localStorage.setItem('password', passwordInput.value);

  localStorage.setItem('cityShipping', cityInputShipping.value);
  localStorage.setItem('streetShipping', streetInputShipping.value);
  localStorage.setItem('postalCodeShipping', postalCodeInputShipping.value);

  localStorage.setItem('cityBilling', cityInputBilling.value);
  localStorage.setItem('streetBilling', streetInputBilling.value);
  localStorage.setItem('postalCodeBilling', postalCodeInputBilling.value);
}

export default getUserObjectRegistrationPage;
