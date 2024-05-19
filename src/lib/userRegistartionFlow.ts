import getUserObjectRegistrationPage from '../components/getUserObjectRegistrationPage/getUserObjectRegistrationPage';
import apiRoot, { projectKey } from './BuildClient';
// import setDefaultShippingAddress from './setShippingAddress';

interface AddressCust {
  firstName: string;
  lastName: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface CustomerDrafts {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: AddressCust[];
  // defaultShippingAddress: number
}

// const navigate = useNavigate();

export async function registerCustomer() {
  const span = document.querySelector('.error-message') as HTMLSpanElement;
  if (span.textContent !== '') {
    span.innerText = '';
  }

  getUserObjectRegistrationPage();
  const addresses: AddressCust = {
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    streetName: localStorage.getItem('street') || '',
    postalCode: localStorage.getItem('postalCode') || '',
    city: localStorage.getItem('country') || '',
    country: localStorage.getItem('countryCode') || '',
  };
  const regCustomerInformation: CustomerDrafts = {
    email: localStorage.getItem('email') || '',
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    password: localStorage.getItem('password') || '',
    addresses: [addresses],
    // defaultShippingAddress: 0
  };

  console.log(regCustomerInformation.email);
  console.log(regCustomerInformation.firstName);
  console.log(regCustomerInformation.lastName);
  console.log(regCustomerInformation.password);
  console.log(addresses.firstName);
  console.log(addresses.lastName);
  console.log(addresses.streetName);
  console.log(addresses.postalCode);
  console.log(addresses.city);
  console.log(addresses.country);

  if (
    regCustomerInformation.email &&
    regCustomerInformation.firstName &&
    regCustomerInformation.lastName &&
    regCustomerInformation.password &&
    addresses.firstName &&
    addresses.lastName &&
    addresses.streetName &&
    addresses.postalCode &&
    addresses.city &&
    addresses.country
  ) {
    try {
      const newCustomerResponse = await apiRoot
        .withProjectKey({ projectKey })
        .customers()
        .post({
          body: regCustomerInformation,
        })
        .execute();

      if (newCustomerResponse.statusCode === 201) {
        apiRoot
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
              // setDefaultShippingAddress()
              // navigate('/');
              // createAuthorizedClient(regCustomerInformation.email, regCustomerInformation.password).withProjectKey({ projectKey }).get().execute();
              return res.body.customer;
            }
          });
        console.log(newCustomerResponse);
        return newCustomerResponse.body.customer;
      } else {
        console.error(
          `Failed to register customer, status code: ${newCustomerResponse.statusCode}`,
        );
        return null;
      }
    } catch (error) {
      const spanError = document.querySelector('.error-message') as HTMLSpanElement;
      spanError.innerText = (error as Error).message;
      console.error('Error during customer registration:', error);
      return null;
    }
  }
}
