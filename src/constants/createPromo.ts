//Тут просто заготовка для промокодов для будующих поколений.
//Пусть будет , вдруг когда нибудь пригодиться :)
// createDiscount
// checkUser()
//   .withProjectKey({ projectKey })
//   .cartDiscounts()
//   .post({
//     body: {
//       name: { en: 'Happy Student Discount' },
//       value: {
//         type: 'relative',
//         permyriad: 1000,
//       },
//       target: {
//         type: 'lineItems',
//         predicate: '1=1',
//       },
//       cartPredicate: '1=1',
//       sortOrder: '0.993',
//       requiresDiscountCode: true,
//     },
//   })
//   .execute();
// .then((res) => {
// if (res.statusCode === 201) {
// checkUser()
//   .withProjectKey({ projectKey })
//   .discountCodes()
//   .post({
//     body: {
//       code: 'HappyStudent',
//       name: {
//         en: 'Happy Student Discount',
//       },
//       cartDiscounts: [
//         {
//           typeId: 'cart-discount',
//           id: '022f54f7-9b38-41fe-9e6e-324cfd9927d9',
//         },
//       ],
//       isActive: true,
//       cartPredicate: '1=1',
//     },
//   })
//   .execute();
// }
// });
