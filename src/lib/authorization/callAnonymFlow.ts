import { projectKey } from '../exports/exportsContants';
import anonymousAuthMiddlewareOptions from '../flow/anonymFlow';
import { createAnonymUser } from './createAnonumUser';

if (!localStorage.getItem('userId')) {
  createAnonymUser();
}

//сразу создаем анонимную корзину
if (localStorage.getItem('anonymousCartId')) {
  anonymousAuthMiddlewareOptions()
    .withProjectKey({ projectKey })
    .carts()
    .withId({ ID: localStorage.getItem('anonymousCartId') as string })
    .get()
    .execute()
    .then((res) => {
      if (res.statusCode === 200) {
        if (res.body.anonymousId === localStorage.getItem('anonymousId')) {
          return;
        } else {
          const cartId = localStorage.getItem('anonymousCartId');
          anonymousAuthMiddlewareOptions()
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
  anonymousAuthMiddlewareOptions()
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
