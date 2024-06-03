export default interface User {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  title?: string;
  dateOfBirth?: string;
  companyName?: string;
  vatId?: string;
  addresses: Address[];
  defaultShippingAddressId?: string;
  shippingAddressIds?: string[];
  defaultBillingAddressId?: string;
  billingAddressIds?: string[];
  isEmailVerified: boolean;
  customerGroup?: CustomerGroupReference;
  custom?: CustomFields;
  locale?: string;
  salutation?: string;
  key?: string;
  stores?: StoreKeyReference[];
  authenticationMode: 'Password' | 'ExternalAuth';
}

interface Address {
  id: string;
  title?: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  additionalStreetInfo?: string;
  postalCode?: string;
  city?: string;
  region?: string;
  state?: string;
  country: string;
  company?: string;
  department?: string;
  building?: string;
  apartment?: string;
  pOBox?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  fax?: string;
  additionalAddressInfo?: string;
  externalId?: string;
}

interface CustomerGroupReference {
  typeId: 'customer-group';
  id: string;
}

interface CustomFields {
  type: TypeReference;
  fields: {
    [name: string]: string;
  };
}

interface TypeReference {
  typeId: 'type';
  id: string;
}

interface StoreKeyReference {
  typeId: 'store';
  key: string;
}
