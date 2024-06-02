import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
// import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
// import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
// import fetch from 'node-fetch';
import { projectKey } from '../../lib/anonymFlow';

// const projectKey = 'your-project-key';
const authUrl = 'https://auth.europe-west1.gcp.commercetools.com';
const apiUrl = 'https://api.europe-west1.gcp.commercetools.com';

function getSimilarProducts(id1: string, id2: string){
    const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow({
      host: authUrl,
      projectKey,
      credentials: {
        clientId: process.env.VITE_CTP_CLIENT_ID || '',
        clientSecret: process.env.VITE_CTP_CLIENT_SECRET || '',
      },
      fetch,
    })
    .withHttpMiddleware({
      host: apiUrl,
      fetch,
    })
    .build();

const apiRoot: ApiRoot = createApiBuilderFromCtpClient(client);

// Предположим, что у вас есть ID категории, в которой вы хотите найти похожие товары
const categoryId = id1 || id2;

return apiRoot.withProjectKey({ projectKey })
  .productProjections()
  .search()
  .get({
    queryArgs: {
      filter: [`categories.id:"${categoryId}"`], // Фильтр по ID категории
      // Добавьте другие параметры фильтрации, если необходимо
      limit: 3, // Количество возвращаемых продуктов
    }
  })
  .execute()
//   .then(response => {
//     return response.body.results;
//     // console.log(response.body.results); // Массив похожих продуктов
//   })
//   .catch(error => {
//     console.error(error);
//   });
 }


  export default getSimilarProducts;