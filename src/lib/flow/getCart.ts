import { ApiRoot } from '@commercetools/platform-sdk';
import { loginUser } from '../../pages/accountPage/loginPage';
import { projectKey } from '../exports/exportsContants';
import apiRoot from './anonymFlow';

const getCart = async () => {
  let client: ApiRoot = apiRoot;
  if (localStorage.getItem('userId')) client = loginUser;

  const activeCart = client
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .withId({ ID: localStorage.getItem('anonymousCartId') as string })
    .get()
    .execute();
  return activeCart;
};

export { getCart };
