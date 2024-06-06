import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { projectKey } from '../exports/exportsContants';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

function getProductBySlug(slug: string) {
  const authUrl = 'https://auth.europe-west1.gcp.commercetools.com';
  const apiUrl = 'https://api.europe-west1.gcp.commercetools.com';

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

  return apiRoot
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
