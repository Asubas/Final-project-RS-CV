import { BadRequest } from '@commercetools/sdk-client-v2/dist/declarations/src/sdk-client/errors';
import getUserObjectRegistrationPage from '../components/getUserObjectRegistrationPage/getUserObjectRegistrationPage';
import apiRoot, { projectKey } from './BuildClient';

interface CustomerDrafts {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

// const navigate = useNavigate();

export async function registerCustomer() {
  const span = document.querySelector('.error-message') as HTMLSpanElement;
  if(span.textContent !== ""){
    span.innerText = "";
  }
  
  getUserObjectRegistrationPage();
  const regCustomerInformation = {
    email: localStorage.getItem('email'),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    password: localStorage.getItem('password'),
  };

  if (
    regCustomerInformation.email !== null &&
    regCustomerInformation.firstName !== null &&
    regCustomerInformation.lastName !== null &&
    regCustomerInformation.password !== null
  ) {
    try {
      const response = await apiRoot
        .withProjectKey({ projectKey })
        .customers()
        .post({
          body: regCustomerInformation as CustomerDrafts,
        })
        .execute();

      if (response.statusCode === 201) {
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
              // navigate('/');
              // createAuthorizedClient(regCustomerInformation.email, regCustomerInformation.password).withProjectKey({ projectKey }).get().execute();
              return res.body.customer;
            }
          });
        return response.body.customer;
      } else {
          console.error(`Failed to register customer, status code: ${response.statusCode}`);
        return null;
      }
    } catch (error) {
      const span = document.querySelector('.error-message') as HTMLSpanElement;
      span.innerText = (error as Error).message;
      console.error('Error during customer registration:', error);
      return null;
    }
  }
}
