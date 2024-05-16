export const currentElementPostalCodeInput = (
  document.getElementsByClassName(
    'registration__input registration-form_postal-code-input',
  ) as HTMLCollection
)[0] as HTMLInputElement;
export const inputDateValue = document.querySelector(
  '.registration-form_date-of-birth-input',
) as HTMLInputElement;
export const yearsToAdd = 16;
export const minDate = new Date('1940-01-01');
export const maxDate = new Date();
export const errorSpan = document.getElementById('error');
export const ultimateDate = new Date(
  maxDate.getFullYear() - yearsToAdd,
  maxDate.getMonth(),
  maxDate.getDate(),
);
export const ultimateDateMilliseconds = ultimateDate.getTime();
