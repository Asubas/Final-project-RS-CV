import { countries } from '../../constants/constantsRegistrationPage';

const validatePostalCode = (countryCode: string) => {
  return (postalCode: string) => {
    const country = countries.find((countryF) => countryF.pattern === countryCode);
    if (!country) {
      return 'Invalid country code';
    }
    const regex = new RegExp(country.pattern);
    if (!regex.test(postalCode)) {
      return `Invalid postal code for ${country.label}`;
    }
    return true;
  };
};

export default validatePostalCode;
