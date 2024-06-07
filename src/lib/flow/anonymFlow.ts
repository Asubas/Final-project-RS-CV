import {
  ClientBuilder,
  Client,
  AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
import { httpMiddlewareOptions, projectKey } from '../exports/exportsContants';
// import { LocalStorageTokenCache } from './tokenFlow';

// const tokens = new LocalStorageTokenCache();
const anonymousAuthMiddlewareOptions = (): ApiRoot => {
  const anonymClientId = crypto.randomUUID();
  const options: AnonymousAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: process.env.VITE_CTP_PROJECT_KEY || '',
    credentials: {
      clientId: process.env.VITE_CTP_CLIENT_ID || '',
      clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
      anonymousId: anonymClientId,
    },
    scopes: [`manage_project:${projectKey}`],
    fetch,
    // tokenCache: tokens,
  };

  const anonymClient: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  localStorage.setItem('anonymousId', `${anonymClientId}`);
  return createApiBuilderFromCtpClient(anonymClient);
};
const apiRoot = anonymousAuthMiddlewareOptions();
export default apiRoot;
