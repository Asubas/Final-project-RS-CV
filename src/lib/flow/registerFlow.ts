import { AuthMiddlewareOptions, Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions, projectKey } from '../exports/exportsContants';
import { LocalStorageTokenCache } from './tokenFlow';

const tokens = new LocalStorageTokenCache();
const options: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: process.env.VITE_CTP_PROJECT_KEY || '',
  credentials: {
    clientId: process.env.VITE_CTP_CLIENT_ID || '',
    clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
  },
  tokenCache: tokens,
  scopes: [`manage_project:${projectKey}`],
  fetch,
};

const registerClient: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(options)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export { registerClient };
