import getUserObjectRegistrationPage from '../components/getUserObjectRegistrationPage/getUserObjectRegistrationPage';
import apiRoot, { projectKey } from './anonymFlow';

interface AddressCust {
  firstName: string;
  lastName: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface CustomerDraftsWithDefaultAddress {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: AddressCust[];
  defaultShippingAddress: number;
}

async function registerUserWithDefaultShippingAddress() {
  getUserObjectRegistrationPage();
  const addressesShipping: AddressCust = {
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    streetName: localStorage.getItem('streetShipping') || '',
    postalCode: localStorage.getItem('postalCodeShipping') || '',
    city: localStorage.getItem('countryShipping') || '',
    country: localStorage.getItem('countryCodeShipping') || '',
  };

  const addressesBilling: AddressCust = {
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    streetName: localStorage.getItem('streetBilling') || '',
    postalCode: localStorage.getItem('postalCodeBilling') || '',
    city: localStorage.getItem('countryBilling') || '',
    country: localStorage.getItem('countryCodeBilling') || '',
  };

  const regCustomerInformation: CustomerDraftsWithDefaultAddress = {
    email: localStorage.getItem('email') || '',
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    password: localStorage.getItem('password') || '',
    addresses: [addressesShipping, addressesBilling],
    defaultShippingAddress: 0,
  };

  if (
    regCustomerInformation.email &&
    regCustomerInformation.firstName &&
    regCustomerInformation.lastName &&
    regCustomerInformation.password &&
    addressesShipping.firstName &&
    addressesShipping.lastName &&
    addressesShipping.streetName &&
    addressesShipping.postalCode &&
    addressesShipping.city &&
    addressesShipping.country &&
    addressesBilling.firstName &&
    addressesBilling.lastName &&
    addressesBilling.streetName &&
    addressesBilling.postalCode &&
    addressesBilling.city &&
    addressesBilling.country
  ) {
    try {
      const newCustomerResponse = await apiRoot()
        .withProjectKey({ projectKey })
        .customers()
        .post({
          body: regCustomerInformation,
        })
        .execute();
      if (newCustomerResponse.statusCode === 201) {
        apiRoot()
          .withProjectKey({ projectKey })
          .login()
          .post({
            body: {
              email: regCustomerInformation.email,
              password: regCustomerInformation.password,
            },
          })
          .execute()
          .then((res) => {
            if (res.statusCode === 200) {
              localStorage.setItem('userId', `${res.body.customer.id}`);
              return res.body.customer;
            }
          });
        return newCustomerResponse.body.customer;
      } else {
        return null;
      }
    } catch (error) {
      const spanError = document.querySelector('.error-message') as HTMLSpanElement;
      spanError.innerText = (error as Error).message;
      return null;
    }
  }
}

export default registerUserWithDefaultShippingAddress;
