import { projectKey } from '../exports/exportsContants';
import apiRoot from '../flow/anonymFlow';
import { createAnonymUser } from './createAnonumUser';

if (!localStorage.getItem('userId') && !localStorage.getItem('accessToken')) {
  createAnonymUser().then((response) => {
    //сразу создаем анонимную корзину
    if (response.statusCode === 200) {
      if (localStorage.getItem('anonymousCartId')) {
        apiRoot
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
                apiRoot
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
        apiRoot
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
} else {
  //иначе восстанавливаем через рефрешь сессию
  createAnonymUser();
}
