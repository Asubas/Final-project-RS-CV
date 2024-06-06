import {
  ClientBuilder,
  Client,
  AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
import { httpMiddlewareOptions, projectKey } from '../exports/exportsContants';

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

  const anonymClient: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(anonymClient);
};

export default anonymousAuthMiddlewareOptions;
