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
  const inputDateMilliseconds = dateValue.getTime();

  if (isNaN(dateValue.getTime())) {
    if (errorSpan) {
      errorSpan.style.display = 'inline';
      errorSpan.innerText = 'Invalid date';
    }
    inputDateValue.setAttribute('style', 'border: 1px solid red');
    return;
  }

  if (dateValue < minDate || dateValue > maxDate) {
    inputDateValue.setAttribute('style', 'border: 1px solid red');
    if (errorSpan) {
      errorSpan.style.display = 'inline';
      errorSpan.innerText = `Available date from ${minDate.getDate()}. ${minDate.getMonth() + 1}. ${minDate.getFullYear()} to ${maxDate.getDate()}.${maxDate.getMonth() + 1}.${maxDate.getFullYear()} `;
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

  if (!isNaN(dateValue.getTime())) {
    localStorage.setItem('date', dateValue.toISOString().split('T')[0]);
  } else {
    localStorage.removeItem('date');
  }
}

export default dateCalculation;
