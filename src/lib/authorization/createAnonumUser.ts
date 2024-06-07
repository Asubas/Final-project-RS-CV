import { projectKey } from '../exports/exportsContants';
import apiRoot from '../flow/anonymFlow';

function createAnonymUser() {
  return apiRoot.withProjectKey({ projectKey }).get().execute();
}

export { createAnonymUser };
