import {
  PasswordAuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
import { projectKey } from './anonymFlow';

const createAuthorizedClient = (email: string, password: string): ApiRoot => {
  const options: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: `${projectKey}`,
    credentials: {
      clientId: process.env.VITE_CTP_CLIENT_ID || '',
      clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
      user: {
        username: email,
        password: password,
      },
    },
    scopes: [`manage_project:${projectKey}`],
    fetch: fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  };

  const userAuthorized = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware()
    .build();
  return createApiBuilderFromCtpClient(userAuthorized);
};

export default createAuthorizedClient;
