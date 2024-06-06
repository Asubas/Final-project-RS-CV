import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { projectKey } from '../exports/exportsContants';

async function getProductById(id: string) {
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

  const productId = id;

  return apiRoot
    .withProjectKey({ projectKey })
    .products()
    .withId({ ID: productId })
    .get()
    .execute();
}

export { getProductById };
