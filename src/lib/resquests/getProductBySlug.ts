import { projectKey } from '../exports/exportsContants';
import { checkUser } from '../flow/anonymFlow';

function getProductBySlug(slug: string) {
  return checkUser()
    .withProjectKey({ projectKey })
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [`slug.en-GB:"${slug}"`],
      },
    })
    .execute()
    .then((res) => res);
}

export default getProductBySlug;
