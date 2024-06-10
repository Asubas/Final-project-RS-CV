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
                    .execute();
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
        const countProduct = res.body.lineItems.length;
        if (countRef.current && countProduct > 0) {
          countRef.current.textContent = countProduct.toString();
        }
      });
    }, 0);
  }
}
startApp();
export { startApp };
