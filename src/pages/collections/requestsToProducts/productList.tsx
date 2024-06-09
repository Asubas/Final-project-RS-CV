import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { projectKey } from '../../../lib/exports/exportsContants';
import { checkUser } from '../../../lib/flow/anonymFlow';
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
  return checkUser()
    .withProjectKey({ projectKey })
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
