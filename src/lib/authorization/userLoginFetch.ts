import { PasswordAuthMiddlewareOptions, ClientBuilder } from '@commercetools/sdk-client-v2';
import { projectKey } from '..';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';

const createAuthorizedClient = (email: string, password: string): ApiRoot => {
  const options: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: `${projectKey}`,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID || '',
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || '',
      user: {
        username: email,
        password: password,
      },
    },
    scopes: [`manage_project:${projectKey}`],
    fetch: fetch,
  };

  const userAuthorized = new ClientBuilder().withPasswordFlow(options).build();
  return createApiBuilderFromCtpClient(userAuthorized);
};

export default createAuthorizedClient;
