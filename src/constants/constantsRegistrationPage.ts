import { InewValue } from '../types/typeRegistrationPage';

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

export const countries: InewValue[] = [
  { value: 'Austria', label: 'Austria', className: 'austria', pattern: '^\\d{4}$' },
  { value: 'Belarus', label: 'Belarus', className: 'belarus', pattern: '^\\d{6}$' },
  { value: 'Poland', label: 'Poland', className: 'poland', pattern: '^\\d{2}-\\d{3}$' },
  { value: 'Russia', label: 'Russia', className: 'russia', pattern: '^\\d{6}$' },
  { value: 'Serbia', label: 'Serbia', className: 'serbia', pattern: '^\\d{5}$' },
  { value: 'France', label: 'France', className: 'france', pattern: '^\\d{5}$' },
];
