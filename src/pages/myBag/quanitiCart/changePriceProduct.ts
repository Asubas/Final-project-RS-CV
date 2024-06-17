import { projectKey } from '../../../lib/exports/exportsContants';
import { checkUser } from '../../../lib/flow/anonymFlow';
import { getCart } from '../../../lib/flow/getCart';
import { getProductById } from '../../../lib/resquests/getProductInfo';

// const changePriceProduct = async (variantID: number, prodID: string) => {
//   return getProductById(prodID).then((res) => {
//     if (res.statusCode === 200) {
//       return checkUser()
//         .withProjectKey({ projectKey })
//         .products()
//         .withId({ ID: prodID })
//         .post({
//           body: {
//             version: res.body.version,
//             actions: [
//               {
//                 "action": "changeMasterVariant",
//                 "variantId": variantID // Замените на ID нового masterVariant
//               },
//             ],
//           },
//         })
//         .execute();
//     }
//   });
// };

// export { changePriceProduct };
