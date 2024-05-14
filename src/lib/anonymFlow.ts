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

const createAnonym: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(anonymClient);
};

async function fetchCustomers() {
  try {
    const apiRoot = createAnonym();
    const response = await apiRoot.withProjectKey({ projectKey }).customers().get().execute();
    console.log(response, 'Api Root');
  } catch (e: unknown) {
    throw new Error(`Ошибка при выполнении запроса: ${(e as Error).message}`);
  }
}

export default fetchCustomers;
