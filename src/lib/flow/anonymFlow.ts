import {
  ClientBuilder,
  Client,
  AnonymousAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
import { httpMiddlewareOptions, projectKey } from '../exports/exportsContants';
import { LocalStorageTokenCache } from './tokenFlow';
let apiRoot: ApiRoot;

type Params = {
  email: string;
  password: string;
};
const createAuthorizedClient = (params: Params): ApiRoot => {
  const tokens = new LocalStorageTokenCache();
  const { email, password } = params;
  const options: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: `${projectKey}`,
    credentials: {
      clientId: process.env.VITE_CTP_CLIENT_ID || '',
      clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
      user: {
        username: email,
        password: password,
      },
    },
    tokenCache: tokens,
    scopes: [`manage_project:${projectKey}`],
    fetch: fetch,
  };

  const userAuthorized = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  apiRoot = createApiBuilderFromCtpClient(userAuthorized);
  return apiRoot;
};
function checkUser(params?: Params, isAuthorized: boolean = false) {
  if (isAuthorized && params) {
    return createAuthorizedClient(params);
  }
  const anonymousAuthMiddlewareOptions = (): ApiRoot => {
    const anonymClientId = crypto.randomUUID();
    const options: AnonymousAuthMiddlewareOptions = {
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey: process.env.VITE_CTP_PROJECT_KEY || '',
      credentials: {
        clientId: process.env.VITE_CTP_CLIENT_ID || '',
        clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
        anonymousId: anonymClientId,
      },
      scopes: [`manage_project:${projectKey}`],
      fetch,
    };

    const anonymClient: Client = new ClientBuilder()
      .withProjectKey(projectKey)
      .withAnonymousSessionFlow(options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
    if (!localStorage.getItem('userId')) localStorage.setItem('anonymousId', `${anonymClientId}`);
    return createApiBuilderFromCtpClient(anonymClient);
  };
  if (localStorage.getItem('anonymousId')) {
    if (!apiRoot) apiRoot = anonymousAuthMiddlewareOptions();
    return apiRoot;
  }
  const tokens = new LocalStorageTokenCache();

  apiRoot = anonymousAuthMiddlewareOptions();

  if (localStorage.getItem('userId')) {
    const optionRefresh: RefreshAuthMiddlewareOptions = {
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey: process.env.VITE_CTP_PROJECT_KEY || '',
      credentials: {
        clientId: process.env.VITE_CTP_CLIENT_ID || '',
        clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
      },
      tokenCache: tokens,
      refreshToken: localStorage.getItem('refreshToken') as string,
      fetch,
    };
    const authClietn = new ClientBuilder()
      .withProjectKey(projectKey)
      .withRefreshTokenFlow(optionRefresh)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
    apiRoot = createApiBuilderFromCtpClient(authClietn);
    localStorage.removeItem('anonymousId');
  }
  return apiRoot;
}
export { checkUser };
