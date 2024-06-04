// import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { projectKey } from '../exports/exportsContants';
// import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

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

// const apiRoot = createApiBuilderFromCtpClient(client);

// const getUserById = async (): Promise<Customer | null> => {
//   const userId = localStorage.getItem('userId');
//   if (!userId) {
//     throw new Error('User ID is not available');
//   }

//   await new Promise((resolve) => setTimeout(resolve, 500));

//   try {
//     const response = await apiRoot
//       .withProjectKey({ projectKey })
//       .customers()
//       .withId({ ID: userId })
//       .get()
//       .execute();
//     const customerData: Customer = response.body;
//     console.log('customer:', response.body);
//     return customerData;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

export { client };
