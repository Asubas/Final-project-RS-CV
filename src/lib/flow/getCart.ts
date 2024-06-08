import { projectKey } from '../exports/exportsContants';
import apiRoot from './anonymFlow';

export const getCart = async () => {
  if (!localStorage.getItem('userId')) {
    return apiRoot
      .withProjectKey({ projectKey })
      .me()
      .carts()
      .withId({ ID: localStorage.getItem('anonymousCartId') as string })
      .get()
      .execute();
  } else {
    return apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .withId({ ID: localStorage.getItem('anonymousCartId') as string })
      .get()
      .execute();
  }
};
