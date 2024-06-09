import { projectKey } from '../exports/exportsContants';
import { checkUser } from './anonymFlow';

export const getCart = async () => {
  if (!localStorage.getItem('userId')) {
    return checkUser()
      .withProjectKey({ projectKey })
      .me()
      .carts()
      .withId({ ID: localStorage.getItem('anonymousCartId') as string })
      .get()
      .execute();
  } else {
    return (
      checkUser()
        .withProjectKey({ projectKey })
        .me()
        .activeCart()
        // .carts()
        // .withId({ ID: localStorage.getItem('anonymousCartId') as string })
        .get()
        .execute()
    );
  }
};