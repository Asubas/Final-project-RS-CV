function AccordanceCountryToPostalCode() {
  const currentElement = (
    document.getElementsByClassName(
      'registration__input registration-form_postal-code-input',
    ) as HTMLCollection
  )[0] as HTMLInputElement;

  const currentCountry = localStorage.getItem('country');

  switch (currentCountry) {
    case 'Austria': {
      currentElement.pattern = '^\\d{4}$';
      const matchesAustria = /^\d{4}$/.test(currentElement.value);
      if (matchesAustria === false) {
        return 'Must be contain 4 numbers';
      }
      currentElement.removeAttribute('style');
      return '';
    }
    case 'Belarus':
    case 'Russia': {
      currentElement.pattern = '^\\d{6}$';
      const matchesBelRus = /^\d{6}$/.test(currentElement.value);
      if (matchesBelRus === false) {
        return 'Must be contain 6 numbers';
      }
      currentElement.removeAttribute('style');
      return '';
    }

    case 'Poland': {
      currentElement.pattern = '^\\d{2}-\\d{3}$';
      const matchesPoland = /^\d{2}-\d{3}$/.test(currentElement.value);
      if (matchesPoland === false) {
        return 'Must be have format 00-000';
      }
      currentElement.removeAttribute('style');
      return '';
    }

    case 'Serbia':
    case 'France': {
      currentElement.pattern = '^^\\d{5}$';
      const matchesSerbFrance = /^\d{5}$/.test(currentElement.value);
      if (matchesSerbFrance === false) {
        return 'Must be contain 5 numbers';
      }
      currentElement.removeAttribute('style');
      return '';
    }

    default:
      return ' ';
  }
}

export default AccordanceCountryToPostalCode;
