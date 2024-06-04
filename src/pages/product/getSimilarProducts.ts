import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { projectKey } from '../../lib/exports/exportsContants';
const authUrl = 'https://auth.europe-west1.gcp.commercetools.com';
const apiUrl = 'https://api.europe-west1.gcp.commercetools.com';

function getSimilarProducts(id1: string, id2: string) {
  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow({
      host: authUrl,
      projectKey,
      credentials: {
        clientId: process.env.VITE_CTP_CLIENT_ID || '',
        clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
      },
      fetch,
    })
    .withHttpMiddleware({
      host: apiUrl,
      fetch,
    })
    .build();

  const apiRoot: ApiRoot = createApiBuilderFromCtpClient(client);

  const categoryId = id1 || id2;

  return apiRoot
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
