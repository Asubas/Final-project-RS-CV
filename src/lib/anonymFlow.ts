import {
  ClientBuilder,
  Client,
  AnonymousAuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';

export const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY || '';

const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || '',
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
  .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

const createAnonym: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(anonymClient);
};

const fetchCustomers = async () => {
  const apiRoot = createAnonym();
  return apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .get()
    .execute()
    .then((res) => res.body)
    .catch(() => null);
};

export default fetchCustomers;
