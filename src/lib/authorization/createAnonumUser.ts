import { projectKey } from '../exports/exportsContants';
import { checkUser } from '../flow/anonymFlow';
async function createAnonymUser() {
  return checkUser().withProjectKey({ projectKey }).get().execute();
}

export { createAnonymUser };
