import { projectKey } from '../exports/exportsContants';
import apiRoot from './anonymFlow';
import { getCart } from './getCart';

const addProductToCart = async (id: string = '') => {
  const result = await getCart().then((res) => {
    if (res.statusCode === 200) {
      return apiRoot
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
