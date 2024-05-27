import {
  ProductProjectionPagedQueryResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { projectKey } from '../../../lib/anonymFlow';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: process.env.VITE_CTP_CLIENT_ID || '',
    clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
  },
  scopes: [`manage_project:${projectKey}`],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware()
  .build();

const request = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

const getProductList = async (count: number = 0): Promise<ProductProjectionPagedQueryResponse> => {
  return request
    .productProjections()
    .get({
      queryArgs: {
        limit: 9,
        offset: count,
        // count: countRequestProducts,
      },
    })
    .execute()
    .then((res) => res.body as ProductProjectionPagedQueryResponse);
};
// const products = await getProductList();
export { getProductList };
