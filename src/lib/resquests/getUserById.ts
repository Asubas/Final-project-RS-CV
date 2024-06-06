import {
  ClientBuilder,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { projectKey } from '../exports/exportsContants';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.europe-west1.gcp.commercetools.com`,
  projectKey,
  credentials: {
    clientId: process.env.VITE_CTP_CLIENT_ID || '',
    clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
  },
  scopes: [`manage_project:${projectKey}`],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.europe-west1.gcp.commercetools.com`,
  fetch,
};

const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export { client };
