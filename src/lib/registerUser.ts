import getUserRequestObject from '../components/getUserObjectRegistrationPage/getUserRequestObject';
import apiRoot, { projectKey } from './anonymFlow';
import createAuthorizedClient from './userLoginFlow';

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
        .execute().then((resp) => {
          if (resp.statusCode === 201) {
            createAuthorizedClient(bodyRequest.email, bodyRequest.password)
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
              console.log(resp.body.customer)
            return resp.body.customer;
          } else {
            return null;
          }
        })
      } catch (error) {
        return null;
      }
  }
}

export default registerUser;
