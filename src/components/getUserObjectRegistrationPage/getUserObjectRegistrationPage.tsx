import { countries } from '../../constants/constantsRegistrationPage';

export function getUserObjectRegistrationPage() {
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
  // const countrySelect = document.querySelector('.custom-select__input-container');
  // const cityInput = document.querySelector('.registration-form_city-input') as HTMLInputElement;
  // const streetInput = document.querySelector('.registration-form_street-input') as HTMLInputElement;
  // const postalCodeInput = document.querySelector(
  //   '.registration-form_postal-code-input',
  // ) as HTMLInputElement;
  // const dateOfBirthInput = document.querySelector(
  //   '.registration-form_date-of-birth-input',
  // ) as HTMLInputElement;

  localStorage.setItem('email', emailInput.value);
  localStorage.setItem('firstName', firstNameInput.value);
  localStorage.setItem('lastName', lastNameInput.value);
  localStorage.setItem('password', passwordInput.value);

  const currentCountryCode = countries.filter(
    (country) => country.value === localStorage.getItem('country'),
  );
  localStorage.setItem('countryCode', currentCountryCode[0].countryCode);

  localStorage.setItem('street', streetInput.value);
  localStorage.setItem('postalCode', postalCodeInput.value);
}

export default getUserObjectRegistrationPage;
