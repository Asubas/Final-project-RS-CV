function AccordanceCountryToPostalCode(className: string) {
  
  // function currentEl (event: Event) {console.log(event.target)};
  
  const currentElementContainer = document.querySelector(className) as HTMLElement;
  console.log(currentElementContainer)

  

  // const currentElementPostalCodeInput = (
  //   document.getElementsByClassName(
  //     'registration__input registration-form_postal-code-input',
  //   ) as HTMLCollection
  // )[0] as HTMLInputElement;

  // console.log(currentElementPostalCodeInput)

  // const currentCountry = localStorage.getItem('countrySipping');

  // switch (currentCountry) {
  //   case 'Austria': {
  //     currentElementPostalCodeInput.pattern = '^\\d{4}$';
  //     const matchesAustria = /^\d{4}$/.test(currentElementPostalCodeInput.value);
  //     if (matchesAustria === false) {
  //       currentElementPostalCodeInput.setAttribute('style', 'border: 1px solid red');
  //       return 'Must be contain 4 numbers';
  //     }
  //     currentElementPostalCodeInput.removeAttribute('style');
  //     return '';
  //   }
  //   case 'Belarus':
  //   case 'Russia': {
  //     currentElementPostalCodeInput.pattern = '^\\d{6}$';
  //     const matchesBelRus = /^\d{6}$/.test(currentElementPostalCodeInput.value);
  //     if (matchesBelRus === false) {
  //       currentElementPostalCodeInput.setAttribute('style', 'border: 1px solid red');
  //       return 'Must be contain 6 numbers';
  //     }
  //     currentElementPostalCodeInput.removeAttribute('style');
  //     return '';
  //   }

  //   case 'Poland': {
  //     currentElementPostalCodeInput.pattern = '^\\d{2}-\\d{3}$';
  //     const matchesPoland = /^\d{2}-\d{3}$/.test(currentElementPostalCodeInput.value);
  //     if (matchesPoland === false) {
  //       currentElementPostalCodeInput.setAttribute('style', 'border: 1px solid red');
  //       return 'Must be have format 00-000';
  //     }
  //     currentElementPostalCodeInput.removeAttribute('style');
  //     return '';
  //   }

  //   case 'Serbia':
  //   case 'France': {
  //     currentElementPostalCodeInput.pattern = '^^\\d{5}$';
  //     const matchesSerbFrance = /^\d{5}$/.test(currentElementPostalCodeInput.value);
  //     if (matchesSerbFrance === false) {
  //       currentElementPostalCodeInput.setAttribute('style', 'border: 1px solid red');
  //       return 'Must be contain 5 numbers';
  //     }
  //     currentElementPostalCodeInput.removeAttribute('style');
  //     return '';
  //   }

  //   default:
  //     currentElementPostalCodeInput.removeAttribute('style');
  //     currentElementPostalCodeInput.value = '';
  //     return ' ';
  // }
}

export default AccordanceCountryToPostalCode;
