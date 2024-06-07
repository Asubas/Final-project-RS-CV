import { ApiRoot } from '@commercetools/platform-sdk';
import { loginUser } from '../../pages/accountPage/loginPage';
import { projectKey } from '../exports/exportsContants';
import apiRoot from './anonymFlow';
import { getCart } from './getCart';

const addProductToCart = async (id: string = '') => {
  const result = await getCart().then((res) => {
    if (res.statusCode === 200) {
      let client: ApiRoot = apiRoot;
      if (localStorage.getItem('userId')) client = loginUser as ApiRoot;

      return client
        .withProjectKey({ projectKey })
        .carts()
        .withId({ ID: res.body.id })
        .post({
          body: {
            version: res.body.version,
            actions: [
              {
                action: 'addLineItem',
                productId: id,
                //   variantId: 1,
                quantity: 1,
              },
            ],
          },
        })
        .execute();
    }
  });

  return result;
};

export { addProductToCart };
