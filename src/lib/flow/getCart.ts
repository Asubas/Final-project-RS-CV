import { loginUser } from '../../pages/accountPage/loginPage';
import { projectKey } from '../exports/exportsContants';
import anonymousAuthMiddlewareOptions from './anonymFlow';

const getCart = async () => {
  let client = anonymousAuthMiddlewareOptions();
  if (localStorage.getItem('userId')) client = loginUser;

  const activeCart = await client
    .withProjectKey({ projectKey })
    .carts()
    .withId({ ID: localStorage.getItem('anonymousCartId') as string })
    .get()
    .execute();
  return activeCart;
};

export { getCart };
