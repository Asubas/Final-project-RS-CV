import {
  // CategoryPagedQueryResponse,
  // CategoryPagedQueryResponse,
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

// const getProductListQueryArgs = (count: number = 0, categoryID: string = '') => {
//   return {
//     limit: 9,
//     offset: count,
//     filter: `categories.id:"${categoryID}"`,
//   };
// };

const getProductList = async (
  limitAtr: number,
  offsetAtr: number,
  categoryID: string,
  sortPriceDesc: string = '',
  country: string = '',
  flavour: string = '',
): Promise<ProductProjectionPagedQueryResponse> => {
  const sort = [sortPriceDesc];
  const filters = [`categories.id:"${categoryID}"`];
  if (sortPriceDesc === 'price desc') sort.push('id desc');
  if (country) filters.push(`variants.attributes.origin:"${country}"`);
  if (flavour) filters.push(`variants.attributes.flavor:"${flavour}"`);
  return request
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: limitAtr,
        offset: offsetAtr,
        filter: filters,
        // filter: `variants.attributes.origin:"China"`,
        sort: sort,
      },
    })
    .execute()
    .then((res) => res.body as ProductProjectionPagedQueryResponse);
};

export { getProductList };

// const getCategories = async (
//   limit: number = 20,
//   offset: number = 0,
// ): Promise<CategoryPagedQueryResponse> => {
//   return request
//     .categories()
//     .get({
//       queryArgs: {
//         limit,
//         offset,
//       },
//     })
//     .execute()
//     .then((res) => res.body as CategoryPagedQueryResponse);
// };

// const fetchAllCategories = async () => {
//   let offset = 0;
//   const limit = 100;
//   let hasMoreCategories = true;

//   while (hasMoreCategories) {
//     const categoryResponse = await getCategories(limit, offset);
//     categoryResponse.results.forEach((category) => {
//       console.log(`Category ID: ${category.id}, Category Key: ${category.key}`);
//     });

//     offset += limit;
//     hasMoreCategories = categoryResponse.count > offset;
//   }
// };

// export { fetchAllCategories };
