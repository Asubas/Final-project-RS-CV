import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { projectKey } from './anonymFlow';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import DisplayProductInformation from '../pages/product/productCardInformation';

async function getProductById(id: string) {
  console.log(id);
  // const navigate = useNavigate();

  const authUrl = 'https://auth.europe-west1.gcp.commercetools.com';
  const apiUrl = 'https://api.europe-west1.gcp.commercetools.com';

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

  const productId = id;
  // const navigate = useNavigate();

  return await apiRoot
    .withProjectKey({ projectKey })
    .products()
    .withId({ ID: productId })
    .get()
    .execute();
  // .then((response) => {
  //   if (response.statusCode === 200) {
  //     // navigate(`/${productId}`);

  //     console.log(response.body);
  //     const objProd = {
  //       name: response.body.masterData.current.name['en-US'],
  //       descripton: response.body.masterData.current.description,
  //       images: response.body.masterData.current.masterVariant.images,
  //     };

  //     console.log(objProd);
  //     return objProd;
  //   }
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
}

export default getProductById;
