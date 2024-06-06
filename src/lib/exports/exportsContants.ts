import { HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

const projectKey = process.env.VITE_CTP_PROJECT_KEY || '';
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

export { projectKey, httpMiddlewareOptions };
