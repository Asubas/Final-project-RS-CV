import {
  ProductProjectionPagedQueryResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { projectKey } from '../../../lib/exports/exportsContants';
import { LocalStorageTokenCache } from '../../../lib/flow/tokenFlow';

const tokens = new LocalStorageTokenCache();
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: process.env.VITE_CTP_CLIENT_ID || '',
    clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
  },
  scopes: [`manage_project:${projectKey}`],
  fetch,
  tokenCache: tokens,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

const request = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
const getProductList = async (
  limitAtr: number,
  offsetAtr: number,
  categoryID: string | string[],
  sortPriceDesc: string = '',
  country: string = '',
  flavour: string = '',
  reset: boolean = false,
  valueText: string = '',
  fuzzySelected: boolean = false,
): Promise<ProductProjectionPagedQueryResponse> => {
  const sort = [sortPriceDesc];
  let filters = [`categories.id:"${categoryID}"`];
  if (sortPriceDesc === 'price desc') sort.push('id desc');
  if (!reset) {
    if (country) filters.push(`variants.attributes.origin:"${country}"`);
    if (flavour) filters.push(`variants.attributes.flavor:"${flavour.toLocaleLowerCase()}"`);
    if (valueText) {
      fuzzySelected = true;
      filters = [''];
    }
  }
  return request
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: limitAtr,
        offset: offsetAtr,
        filter: filters,
        sort: sort,
        'text.en-GB': valueText,
        fuzzy: fuzzySelected,
      },
    })
    .execute()
    .then((res) => res.body as ProductProjectionPagedQueryResponse);
};

export { getProductList };
