import { projectKey } from '../exports/exportsContants';
import anonymousAuthMiddlewareOptions from '../flow/anonymFlow';

function createAnonymUser() {
  anonymousAuthMiddlewareOptions().withProjectKey({ projectKey }).get().execute();
}

export { createAnonymUser };
