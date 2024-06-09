import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import getUserRequestObject from '../../components/getUserObjectRegistrationPage/getUserRequestObject';
import { projectKey } from '../exports/exportsContants';
import { registerClient } from '../flow/registerFlow';
import { NavigateFunction } from 'react-router-dom';
import { loginRef, reqRef } from '../../components/header/navBar/navBar';
import { errorRegister, successRegister } from '../../components/toastyOption/toastyOptions';
import { toast } from 'react-toastify';
import { checkUser } from '../flow/anonymFlow';
import { ExtendedMyCustomerSignin } from '../../interfaces/interfaces';

function registerUser(navigate: NavigateFunction) {
  const bodyRequest = getUserRequestObject();
  if (bodyRequest) {
    createApiBuilderFromCtpClient(registerClient)
      .withProjectKey({ projectKey })
      .customers()
      .post({
        body: bodyRequest,
      })
      .execute()
      .then((res) => {
        if (res.statusCode === 201) {
          localStorage.setItem('userId', `${res.body.customer.id}`);
          localStorage.setItem('userVersion', `${res.body.customer.version}`);
          if (loginRef.current) loginRef.current.textContent = 'Log out';
          toast.success('🔥 You have successfully registered and logged in!', successRegister);
          const keyToKeep = ['anonymousId', 'anonymousCartId', 'userId', 'userVersion'];
          const keys = Object.keys(localStorage);
          const keysToDelete = keys.filter((key) => !keyToKeep.includes(key));
          keysToDelete.forEach((key) => {
            localStorage.removeItem(key);
          });
          const userId = localStorage.getItem('userId') as string;
          const userVersion = localStorage.getItem('userVersion');
          createApiBuilderFromCtpClient(registerClient)
            .withProjectKey({ projectKey })
            .customers()
            .withId({ ID: userId })
            .post({
              body: {
                version: Number(userVersion),
                actions: [
                  {
                    action: 'addShippingAddressId',
                    addressId: res.body.customer.addresses[0].id,
                  },
                  {
                    action: 'addBillingAddressId',
                    addressId: res.body.customer.addresses[1].id,
                  },
                ],
              },
            })
            .execute()
            .then((resAddress) => {
              localStorage.removeItem('userId');
              localStorage.removeItem('userVersion');
              if (resAddress.statusCode === 200) {
                checkUser()
                  .withProjectKey({ projectKey })
                  .me()
                  .login()
                  .post({
                    body: {
                      email: bodyRequest.email,
                      password: bodyRequest.password,
                      anonymousCartId: localStorage.getItem('anonymousCartId'),
                      anonymousId: localStorage.getItem('anonymousId'),
                      activeCartSignInMode: 'MergeWithExistingCustomerCart',
                      updateProductData: true,
                    } as ExtendedMyCustomerSignin,
                  })
                  .execute()
                  .then((response) => {
                    if (response.statusCode === 200) {
                      checkUser({ email: bodyRequest.email, password: bodyRequest.password }, true)
                        .withProjectKey({ projectKey })
                        .me()
                        .get()
                        .execute()
                        .then((resp) => {
                          if (resp.statusCode === 200) {
                            localStorage.setItem('userId', `${resp.body.id}`);
                            localStorage.setItem('userVersion', `${resp.body.version}`);
                            localStorage.removeItem('anonymousId');
                            navigate('/');
                            if (loginRef.current && reqRef.current) {
                              loginRef.current.textContent = 'log out';
                              reqRef.current.textContent = 'profile';
                            }
                          }
                        });
                      navigate('/');
                    }
                  });
              }
            });
        }
      })
      .catch(() => {
        toast.error(
          'Registration error. Perhaps a user with this email already exists!',
          errorRegister,
        );
      });
  }
}

export { registerUser };
