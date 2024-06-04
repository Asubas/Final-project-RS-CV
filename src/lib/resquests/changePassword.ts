import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// import {
//   ClientBuilder,
//   AuthMiddlewareOptions,
//   HttpMiddlewareOptions,
// } from '@commercetools/sdk-client-v2';
import { client } from './getUserById';
import { projectKey } from '../exports/exportsContants';
// import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

// const authMiddlewareOptions: AuthMiddlewareOptions = {
//   host: `https://auth.europe-west1.gcp.commercetools.com`,
//   projectKey,
//   credentials: {
//     clientId: process.env.VITE_CTP_CLIENT_ID || '',
//     clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
//   },
//   scopes: [`manage_project:${projectKey}`],
//   fetch,
// };

// const httpMiddlewareOptions: HttpMiddlewareOptions = {
//   host: `https://api.europe-west1.gcp.commercetools.com`,
//   fetch,
// };

// const client = new ClientBuilder()
//   .withProjectKey(projectKey)
//   .withClientCredentialsFlow(authMiddlewareOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .build();

// const apiRoot = createApiBuilderFromCtpClient(client);

// interface ChangePasswordParams {
//   // version: number;
//   currentPassword: string;
//   newPassword: string;
// }

// export async function getUser(): Promise<Customer | null> {
//   try {
//     const response = await apiRoot.withProjectKey({ projectKey }).me().get().execute();

//     const customerData: Customer = response.body;
//     return customerData;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return null;
//   }
// }

export async function changeCustomerPassword(
  // version,
  currentPassword: string,
  newPassword: string,
) {
  try {
    createApiBuilderFromCtpClient(client)
      .withProjectKey({ projectKey })
      .me()
      .password()
      .post({
        body: {
          version: 1,
          currentPassword,
          newPassword,
        },
      })
      .execute()
      .then((res) => res.body);
  } catch (error) {
    console.error('Error changing password:', error);
  }
}
