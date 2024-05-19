import getUserObjectRegistrationPage from '../components/getUserObjectRegistrationPage/getUserObjectRegistrationPage';
import apiRoot, { projectKey } from './BuildClient';
import setDefaultShippingAddress from './setShippingAddress';

interface CustomerDrafts {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

// const navigate = useNavigate();

export async function registerCustomer() {
  const span = document.querySelector('.error-message') as HTMLSpanElement;
  if (span.textContent !== '') {
    span.innerText = '';
  }

  getUserObjectRegistrationPage();
  const regCustomerInformation = {
    email: localStorage.getItem('email'),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    password: localStorage.getItem('password'),
  };

  // let existingAddressId: string | undefined;

  if (
    regCustomerInformation.email !== null &&
    regCustomerInformation.firstName !== null &&
    regCustomerInformation.lastName !== null &&
    regCustomerInformation.password !== null
  ) {
    try {
      const newCustomerResponse = await apiRoot
        .withProjectKey({ projectKey })
        .customers()
        .post({
          body: regCustomerInformation as CustomerDrafts,
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
