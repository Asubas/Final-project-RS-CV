export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses?: Address[];
  billingAddressIds?: string[];
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  shippingAddressIds?: string[];
}

export interface Address {
  city: string;
  country: string;
  firstName: string;
  id: string;
  lastName: string;
  postalCode: string;
  streetName: string;
}
