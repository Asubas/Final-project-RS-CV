export default interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addreses?: {
    city: string;
    country: string;
    firstName: string;
    id: string;
    lastName: string;
    postalCode: string;
    streetName: string;
  }[];
  billingAddressIds?: string[];
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  shippingAddressIds?: string[];
}
