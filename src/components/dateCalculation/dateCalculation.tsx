function dateCalculation() {
  //Get input parent container
  //   const inputDateContainer = document.querySelector(
  //     '.registration-form_date-of-birth-input-container',
  //   ) as HTMLElement;

  //Get input
  const inputDateValue = document.querySelector(
    '.registration-form_date-of-birth-input',
  ) as HTMLInputElement;

  //limit age
  const yearsToAdd = 16;

  //Representation from input value date to date
  const dateValue = new Date(inputDateValue.value);

  //Representation from minimum date to date
  const minDate = new Date('1940-01-01');

  //representation from date mow to date
  const maxDate = new Date();

  //get error message span
  const errorSpan = document.getElementById('error');

  //get ultimate date
  const ultimateDate = new Date(
    maxDate.getFullYear() - yearsToAdd,
    maxDate.getMonth(),
    maxDate.getDate(),
  );

  //Convertation from date to milliseconds
  const inputDateMilliseconds = new Date(inputDateValue.value).getTime();

  //validation data
  if (dateValue < minDate || dateValue > maxDate) {
    inputDateValue.setAttribute('style', 'border: 1px solid red');
    if (errorSpan) {
      //   errorSpan.style.display = 'inline';
      //   errorSpan.innerText = `Avaliable date from ${minDate.getDate()}. ${minDate.getMonth()}. ${minDate.getFullYear()} to ${maxDate.getDate()}.${maxDate.getMonth()}.${maxDate.getFullYear()} `
    }
  } else {
    const ultimateDateMilliseconds = ultimateDate.getTime();
    if (inputDateMilliseconds > ultimateDateMilliseconds) {
      inputDateValue.setAttribute('style', 'border: 1px solid red');
      //   if(errorSpan){
      //       errorSpan.innerText = "Registration age - 16";
      //   }
      console.log(inputDateValue);
    } else {
      inputDateValue.removeAttribute('style');
      //   if(errorSpan){
      //       errorSpan.innerText = "";
      //   }
    }
  }
}

export default dateCalculation;
