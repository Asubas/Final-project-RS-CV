import {
  maxDate,
  minDate,
  ultimateDateMilliseconds,
} from '../../constants/constantsRegistrationPage';

function dateCalculation() {
  const inputDateValue = document.querySelector(
    '.registration-form_date-of-birth-input',
  ) as HTMLInputElement;
  const dateValue = new Date(inputDateValue.value);
  const errorSpan = document.getElementById('error');
  const inputDateMilliseconds = new Date(inputDateValue.value).getTime();

  if (dateValue < minDate || dateValue > maxDate) {
    inputDateValue.setAttribute('style', 'border: 1px solid red');
    if (errorSpan) {
      errorSpan.style.display = 'inline';
      errorSpan.innerText = `Avaliable date from ${minDate.getDate()}. ${minDate.getMonth()}. ${minDate.getFullYear()} to ${maxDate.getDate()}.${maxDate.getMonth()}.${maxDate.getFullYear()} `;
    }
  } else {
    if (inputDateMilliseconds > ultimateDateMilliseconds) {
      inputDateValue.setAttribute('style', 'border: 1px solid red');
      if (errorSpan) {
        errorSpan.innerText = 'Registration age - 16';
      }
    } else {
      inputDateValue.removeAttribute('style');
      if (errorSpan) {
        errorSpan.innerText = '';
      }
    }
  }
}

export default dateCalculation;
