function getUserObjectRegistrationPage() {
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
  const countrySelect = document.querySelector('.custom-select__input-container');
  const cityInput = document.querySelector('.registration-form_city-input') as HTMLInputElement;
  const streetInput = document.querySelector('.registration-form_street-input') as HTMLInputElement;
  const postalCodeInput = document.querySelector(
    '.registration-form_postal-code-input',
  ) as HTMLInputElement;
  const dateOfBirthInput = document.querySelector(
    '.registration-form_date-of-birth-input',
  ) as HTMLInputElement;

  console.log(firstNameInput.value);
  console.log(lastNameInput.value);
  console.log(emailInput.value);
  console.log(passwordInput.value);
  console.log(countrySelect);
  console.log(cityInput.value);
  console.log(streetInput.value);
  console.log(postalCodeInput.value);
  console.log(dateOfBirthInput.value);

  localStorage.setItem('email', emailInput.value);
  localStorage.setItem('firstName', firstNameInput.value);
  localStorage.setItem('lastName', lastNameInput.value);
  localStorage.setItem('password', passwordInput.value);
}

export default getUserObjectRegistrationPage;
