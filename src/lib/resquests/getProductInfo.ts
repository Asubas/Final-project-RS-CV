import { projectKey } from '../exports/exportsContants';
import { checkUser } from '../flow/anonymFlow';

async function getProductById(id: string) {
  return checkUser().withProjectKey({ projectKey }).products().withId({ ID: id }).get().execute();
}

export { getProductById };
