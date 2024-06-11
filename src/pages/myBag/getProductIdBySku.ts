import { projectKey } from '../../lib/exports/exportsContants';
import { checkUser } from '../../lib/flow/anonymFlow';

const getProductIdBySku = async (sku: string): Promise<string | null> => {
  try {
    const res = await checkUser()
      .withProjectKey({ projectKey })
      .productProjections()
      .search()
      .get({ queryArgs: { filter: `variants.sku:"${sku}"` } })
      .execute();

    if (res.body.results.length > 0) {
      return res.body.results[0].id;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching product ID:', error);
    return null;
  }
};

export { getProductIdBySku };
