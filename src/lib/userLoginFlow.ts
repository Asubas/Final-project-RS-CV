import { PasswordAuthMiddlewareOptions, ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
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

  const userAuthorized = new ClientBuilder().withPasswordFlow(options).build();
  return createApiBuilderFromCtpClient(userAuthorized);
};

async function loginUser(inputEmail: string, inputPassword: string) {
  try {
    const apiRoot = createAuthorizedClient(inputEmail, inputPassword);
    const response = await apiRoot.withProjectKey({ projectKey }).customers().get().execute();
    console.log(response, 'Api Root');
  } catch (e: unknown) {
    throw new Error(`Ошибка при выполнении запроса: ${(e as Error).message}`);
  }
}

export default loginUser;
