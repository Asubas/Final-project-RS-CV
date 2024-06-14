import { projectKey } from '../../lib/exports/exportsContants';
import { checkUser } from '../../lib/flow/anonymFlow';
function getSimilarProducts(id1: string, id2: string) {
  const categoryId = id1 || id2;

  return checkUser()
    .withProjectKey({ projectKey })
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [`categories.id:"${categoryId}"`],
        limit: 3,
      },
    })
    .execute();
}

export default getSimilarProducts;
