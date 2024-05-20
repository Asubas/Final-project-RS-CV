import {
  ClientBuilder,
  Client,
  AnonymousAuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';

export const projectKey = process.env.VITE_CTP_PROJECT_KEY || '';

const anonymousAuthMiddlewareOptions = (): ApiRoot => {
  const options: AnonymousAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: process.env.VITE_CTP_PROJECT_KEY || '',
    credentials: {
      clientId: process.env.VITE_CTP_CLIENT_ID || '',
      clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
      anonymousId: crypto.randomUUID(),
    },
    scopes: [`manage_project:${projectKey}`],
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  };

  const anonymClient: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(anonymClient);
};

export default anonymousAuthMiddlewareOptions;