import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import getUserRequestObject from '../../components/getUserObjectRegistrationPage/getUserRequestObject';
import { projectKey } from '../exports/exportsContants';
import { registerClient } from '../flow/registerFlow';
import { NavigateFunction } from 'react-router-dom';
import { loginRef } from '../../components/header/navBar/navBar';
import { errorRegister, successRegister } from '../../components/toastyOption/toastyOptions';
import { toast } from 'react-toastify';

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
          navigate('/');
          if (loginRef.current) loginRef.current.textContent = 'Log out';
          toast.success('🔥 You have successfully registered and logged in!', successRegister);
          const keyToKeep = ['userId', 'accessToken', 'refreshToken', 'userVersion'];
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
            .execute();
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
