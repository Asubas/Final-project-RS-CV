// import { Customer, Address } from '@commercetools/platform-sdk';
// import apiRoot, { projectKey } from './BuildClient';

// async function setDefaultShippingAddress() {
//     const customerId = localStorage.getItem('userId');
//     const address: Address = {
//         streetName : localStorage.getItem('street') || "",
//         postalCode: localStorage.getItem('postalCode') || '',
//         city: localStorage.getItem('city') || '',
//         country: localStorage.getItem('country') || ''
//     }
//   try {
//     // Получить текущего покупателя
//     const customerResponse = await apiRoot
//       .withProjectKey({ projectKey })
//       .customers()
//       .withId({ ID: customerId || ''})
//       .get()
//       .execute();

//     const customer: Customer = customerResponse.body;

//     // Добавить адрес в список адресов покупателя, если его там нет
//     let addressId: string | undefined;
//     if(address){
//         const existingAddress = customer.addresses?.find(
//             (addr) =>
//               addr.streetName === address.streetName &&
//               addr.postalCode === address.postalCode &&
//               addr.city === address.city &&
//               addr.country === address.country
//           );

//           if (existingAddress) {
//             addressId = existingAddress.id;
//           } else {
//             const addAddressResponse = await apiRoot
//               .withProjectKey({ projectKey })
//               .customers()
//               .withId({ ID: customerId || ''})
//               .post({
//                 body: {
//                   version: customer.version,
//                   actions: [
//                     {
//                       action: 'addAddress',
//                       address: address,
//                     },
//                   ],
//                 },
//               })
//               .execute();

//             addressId = addAddressResponse.body.addresses?.find(
//               (addr) =>
//                 addr.streetName === address.streetName &&
//                 addr.postalCode === address.postalCode &&
//                 addr.city === address.city &&
//                 addr.country === address.country
//             )?.id;
//           }

//           if (!addressId) {
//             throw new Error('Failed to add or find address');
//           }

//           // Установить адрес по умолчанию для доставки
//           await apiRoot
//             .withProjectKey({ projectKey })
//             .customers()
//             .withId({ ID: customerId || ''})
//             .post({
//               body: {
//                 version: customer.version + 1, // Increment the version after adding address
//                 actions: [
//                   {
//                     action: 'setDefaultShippingAddress',
//                     addressId,
//                   },
//                 ],
//               },
//             })
//             .execute();

//           console.log('Default shipping address set successfully');

//     }

// } catch (error) {
//     console.error('Error setting default shipping address:', error);
//   }

// }
