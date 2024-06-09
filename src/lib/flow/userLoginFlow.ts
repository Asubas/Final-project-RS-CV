// import { PasswordAuthMiddlewareOptions, ClientBuilder } from '@commercetools/sdk-client-v2';
// import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
// import { LocalStorageTokenCache } from './tokenFlow';
// import { httpMiddlewareOptions, projectKey } from '../exports/exportsContants';

// const tokens = new LocalStorageTokenCache();
// const createAuthorizedClient = (email: string, password: string): ApiRoot => {
//   const options: PasswordAuthMiddlewareOptions = {
//     host: 'https://auth.europe-west1.gcp.commercetools.com',
//     projectKey: `${projectKey}`,
//     credentials: {
//       clientId: process.env.VITE_CTP_CLIENT_ID || '',
//       clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
//       user: {
//         username: email,
//         password: password,
//       },
//     },
//     tokenCache: tokens,
//     scopes: [`manage_project:${projectKey}`],
//     fetch: fetch,
//   };

//   const userAuthorized = new ClientBuilder()
//     .withProjectKey(projectKey)
//     .withPasswordFlow(options)
//     .withHttpMiddleware(httpMiddlewareOptions)
//     .build();
//   return createApiBuilderFromCtpClient(userAuthorized);
// };
// export default createAuthorizedClient;
