import {
  ClientBuilder,
  Client,
  AnonymousAuthMiddlewareOptions,
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

const anonymClient: Client = new ClientBuilder()
  .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
  .build();

// export const getApiRoot: () => ApiRoot = () => {
//   return createApiBuilderFromCtpClient(client);
// };

export const createAnonym: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(anonymClient);
};
