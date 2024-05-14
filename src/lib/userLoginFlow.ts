import {
  PasswordAuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
import { CustomerSignInResult } from '@commercetools/platform-sdk';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY || '';
const createAuthorizedClient = (email: string, password: string): ApiRoot => {
  const options: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: `${projectKey}`,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID || '',
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || '',
      user: {
        username: email,
        password: password,
      },
    },
    scopes: [`manage_project:${projectKey}`],
    fetch: fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  };

  const userAuthorized = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderFromCtpClient(userAuthorized);
};

const loginUser = async (
  inputEmail: string,
  inputPassword: string,
): Promise<CustomerSignInResult | null> => {
  const apiRoot = createAuthorizedClient(inputEmail, inputPassword);
  return apiRoot
    .withProjectKey({ projectKey })
    .login()
    .post({
      body: {
        email: inputEmail,
        password: inputPassword,
      },
    })
    .execute()
    .then((response) => response.body);
};

export default loginUser;
