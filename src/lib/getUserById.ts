import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { projectKey } from './anonymFlow';
import User from '../interfaces/customer';

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

const apiRoot = createApiBuilderFromCtpClient(client);

const getUserById = async (): Promise<User | null> => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User ID is not available in localStorage');
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .withId({ ID: userId })
      .get()
      .execute();
    console.log('customer:', response.body);
    return response.body;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getUserById };
