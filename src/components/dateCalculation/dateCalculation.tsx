function dateCalculation() {
  const inputDateValue = document.querySelector(
    '.registration-form_date-of-birth-input',
  ) as HTMLInputElement;
  const yearsToAdd = 16;
  const dateValue = new Date(inputDateValue.value);
  const minDate = new Date('1940-01-01');
  const maxDate = new Date();
  const errorSpan = document.getElementById('error');
  const ultimateDate = new Date(
    maxDate.getFullYear() - yearsToAdd,
    maxDate.getMonth(),
    maxDate.getDate(),
  );
  const inputDateMilliseconds = new Date(inputDateValue.value).getTime();

  if (dateValue < minDate || dateValue > maxDate) {
    inputDateValue.setAttribute('style', 'border: 1px solid red');
    if (errorSpan) {
      errorSpan.style.display = 'inline';
      errorSpan.innerText = `Avaliable date from ${minDate.getDate()}. ${minDate.getMonth()}. ${minDate.getFullYear()} to ${maxDate.getDate()}.${maxDate.getMonth()}.${maxDate.getFullYear()} `;
    }
  } else {
    const ultimateDateMilliseconds = ultimateDate.getTime();
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
