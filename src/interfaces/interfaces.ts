export interface CountryField {
  value: string;
  className: string;
}

export interface AddressCust {
  firstName: string;
  lastName: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}
export interface SelectCountryProps {
  selectedCountry: string | null;
  onCountryChange: (value: string) => void;
}

export interface SelectFlavourProps {
  selectedFlavour: string | null;
  onFlavourChange: (value: string) => void;
}
