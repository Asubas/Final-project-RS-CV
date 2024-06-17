import { projectKey } from '../exports/exportsContants';
import { checkUser } from './anonymFlow';
import { getCart } from './getCart';

const addProductToCart = async (id: string = '', variantId?: number | 1) => {
  const result = await getCart().then((res) => {
    if (res.statusCode === 200) {
      return checkUser()
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
                variantId: variantId, // ID варианта товара
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
