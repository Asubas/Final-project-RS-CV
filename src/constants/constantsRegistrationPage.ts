import { StylesConfig } from 'react-select';
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

export const customStyles: StylesConfig<InewValue> = {
  container: (provided) => ({
    ...provided,
    width: 230,
    '@media (max-width: 620px)': {
      ...provided,
      width: '100%',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'black' : state.isFocused ? '#282828d1' : 'white',
    color: state.isFocused ? 'white' : state.isSelected ? 'white' : 'black',
    padding: 20,
    cursor: 'pointer',
    '&:active': {
      backgroundColor: 'black',
    },
  }),
  control: (provided, state) => ({
    ...provided,
    width: 230,
    height: 56,
    borderRadius: 0,
    boxShadow: state.isFocused ? 'none' : 'none',
    border: '1px solid rgb(118, 118, 118)',
    cursor: 'text',
    boxSizing: 'border-box',
    '&:hover': {
      border: '1px solid rgb(118, 118, 118)',
      boxShadow: 'none',
    },
    '&:active': {
      border: '1px solid rgb(118, 118, 118)',
    },
    '@media (max-width: 620px)': {
      ...provided,
      width: '100%',
      height: 56,
      borderRadius: 0,
      boxShadow: state.isFocused ? 'none' : 'none',
      border: '1px solid rgb(118, 118, 118)',
      cursor: 'text',
      '&:hover': {
        border: '1px solid rgb(118, 118, 118)',
        boxShadow: 'none',
      },
    },
  }),
  input: (provided) => ({
    ...provided,
    paddingLeft: 35,
  }),
  placeholder: (provided) => ({
    ...provided,
    paddingLeft: 35,
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingLeft: 0,
  }),
  menuList: (provided) => ({
    ...provided,
    overflow: 'hidden',
  }),

  singleValue: (provided) => ({
    ...provided,
    color: 'black',
    cursor: 'text',
    paddingLeft: 35,
  }),
};
