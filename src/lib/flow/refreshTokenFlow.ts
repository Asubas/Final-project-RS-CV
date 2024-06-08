import { ClientBuilder, Client, RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
import { httpMiddlewareOptions, projectKey } from '../exports/exportsContants';
import { LocalStorageTokenCache } from './tokenFlow';

const tokens = new LocalStorageTokenCache();
const refreshAuthMiddlewareOptions = (): ApiRoot => {
  const options: RefreshAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: process.env.VITE_CTP_PROJECT_KEY || '',
    credentials: {
      clientId: process.env.VITE_CTP_CLIENT_ID || '',
      clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
    },
    refreshToken: localStorage.getItem('refreshToken') as string,
    tokenCache: tokens,
    fetch,
  };

  const authClient: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withRefreshTokenFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderFromCtpClient(authClient);
};
const refreshClient = refreshAuthMiddlewareOptions();
export { refreshClient };
