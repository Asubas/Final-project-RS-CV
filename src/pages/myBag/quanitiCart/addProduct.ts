import { projectKey } from '../../../lib/exports/exportsContants';
import { checkUser } from '../../../lib/flow/anonymFlow';
import { getCart } from '../../../lib/flow/getCart';

const addProduct = async (itemQuantity: number, itemId: string) => {
  return getCart().then((res) => {
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
                action: 'changeLineItemQuantity',
                lineItemId: itemId,
                quantity: itemQuantity + 1,
              },
            ],
          },
        })
        .execute();
    }
  });
};

export { addProduct };
