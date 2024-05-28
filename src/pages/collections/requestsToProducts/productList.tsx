import {
  CategoryPagedQueryResponse,
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

const getProductList = async (
  count: number = 0,
  categoryID: string = '',
): Promise<ProductProjectionPagedQueryResponse> => {
  return request
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 9,
        offset: count,
        filter: `categories.id:"${categoryID}"`,
      },
    })
    .execute()
    .then((res) => res.body as unknown as ProductProjectionPagedQueryResponse);
};

const getAllProducts = async (): Promise<ProductProjectionPagedQueryResponse> => {
  const limit = 130;
  return request
    .productProjections()
    .get({
      queryArgs: {
        limit,
      },
    })
    .execute()
    .then((res) => res.body as unknown as ProductProjectionPagedQueryResponse);
};
export { getProductList, getAllProducts };

// // вывод категорий. Подсказал шарик
// const getCategories = async (): Promise<CategoryPagedQueryResponse> => {
//   return request
//     .categories()
//     .get()
//     .execute()
//     .then((res) => res.body as CategoryPagedQueryResponse);
// };

// // Вызовите функцию и обработайте результат
// getCategories()
//   .then((categoryResponse) => {
//     categoryResponse.results.forEach((category) => {
//       console.log(`Category ID: ${category.id}, Category Key: ${category.key}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error fetching categories:', error);
//   });

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

// // Вызовите функцию и обработайте результат
// const fetchAllCategories = async () => {
//   let offset = 0;
//   const limit = 100; // Установите желаемое количество категорий на странице
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

// fetchAllCategories().catch((error) => {
//   console.error('Error fetching categories:', error);
// });
