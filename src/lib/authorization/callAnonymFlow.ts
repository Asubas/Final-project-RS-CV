import { countRef } from '../../components/header/navBar/navBar';
import { projectKey } from '../exports/exportsContants';
import { checkUser } from '../flow/anonymFlow';
import { getCart } from '../flow/getCart';
import { createAnonymUser } from './createAnonumUser';
function startApp() {
  if (!localStorage.getItem('userId')) {
    createAnonymUser().then((response) => {
      //сразу создаем анонимную корзину
      if (response.statusCode === 200) {
        if (localStorage.getItem('anonymousCartId')) {
          checkUser()
            .withProjectKey({ projectKey })
            .carts()
            .withId({ ID: localStorage.getItem('anonymousCartId') as string })
            .get()
            .execute()
            .then((res) => {
              if (res.statusCode === 200) {
                if (
                  res.body.anonymousId === localStorage.getItem('anonymousId') &&
                  !localStorage.getItem('userId')
                ) {
                  return;
                } else {
                  const cartId = localStorage.getItem('anonymousCartId');
                  checkUser()
                    .withProjectKey({ projectKey })
                    .carts()
                    .withId({ ID: cartId as string })
                    .post({
                      body: {
                        version: res.body.version,
                        actions: [
                          {
                            action: 'setAnonymousId',
                            anonymousId: localStorage.getItem('anonymousId') as string,
                          },
                        ],
                      },
                    })
                    .execute()
                    .then((resAnonymCart) => {
                      const countProduct = resAnonymCart.body.totalLineItemQuantity;
                      if (countProduct && countRef.current && countProduct > 0) {
                        countRef.current.textContent = countProduct.toString();
                      }
                    });
                }
              }
            });
        } else {
          checkUser()
            .withProjectKey({ projectKey })
            .me()
            .carts()
            .post({
              body: {
                currency: 'USD',
              },
            })
            .execute()
            .then((res) => localStorage.setItem('anonymousCartId', `${res.body.id}`));
        }
      }
    });
  } else if (localStorage.getItem('userId') && !localStorage.getItem('anonymousCartId')) {
    checkUser()
      .withProjectKey({ projectKey })
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
        },
      })
      .execute()
      .then((res) => localStorage.setItem('anonymousCartId', `${res.body.id}`));
  } else {
    //иначе восстанавливаем через рефрешь сессию
    createAnonymUser();
    setTimeout(() => {
      getCart().then((res) => {
        const countProduct = res.body.totalLineItemQuantity;
        if (countProduct && countRef.current && countProduct > 0) {
          countRef.current.textContent = countProduct.toString();
        }
      });
    }, 100);
  }
}
startApp();
export { startApp };

// createDiscount
// checkUser()
//   .withProjectKey({ projectKey })
//   .cartDiscounts()
//   .post({
//     body: {
//       name: { en: 'Happy Student Discount' },
//       value: {
//         type: 'relative',
//         permyriad: 1000,
//       },
//       target: {
//         type: 'lineItems',
//         predicate: '1=1',
//       },
//       cartPredicate: '1=1',
//       sortOrder: '0.993',
//       requiresDiscountCode: true,
//     },
//   })
//   .execute();
// .then((res) => {
// if (res.statusCode === 201) {
// checkUser()
//   .withProjectKey({ projectKey })
//   .discountCodes()
//   .post({
//     body: {
//       code: 'HappyStudent',
//       name: {
//         en: 'Happy Student Discount',
//       },
//       cartDiscounts: [
//         {
//           typeId: 'cart-discount',
//           id: '022f54f7-9b38-41fe-9e6e-324cfd9927d9',
//         },
//       ],
//       isActive: true,
//       cartPredicate: '1=1',
//     },
//   })
//   .execute();
// }
// });
