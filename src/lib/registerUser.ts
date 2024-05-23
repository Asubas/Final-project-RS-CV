import getUserRequestObject from '../components/getUserObjectRegistrationPage/getUserRequestObject';
import apiRoot, { projectKey } from './anonymFlow';

async function registerUser() {
  const bodyRequest = getUserRequestObject();
  if (bodyRequest) {
    try {
      const newCustomerResponse = await apiRoot()
        .withProjectKey({ projectKey })
        .customers()
        .post({
          body: bodyRequest,
        })
        .execute();
      if (newCustomerResponse.statusCode === 201) {
        apiRoot()
          .withProjectKey({ projectKey })
          .login()
          .post({
            body: {
              email: bodyRequest.email,
              password: bodyRequest.password,
            },
          })
          .execute()
          .then((res) => {
            if (res.statusCode === 200) {
              localStorage.setItem('userId', `${res.body.customer.id}`);
              return res.body.customer;
            }
          });
        console.log(newCustomerResponse.body.customer);
        return newCustomerResponse.body.customer;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}

export default registerUser;
