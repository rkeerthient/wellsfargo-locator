export interface Address {
  line1?: string;
  line2?: string;
  line3?: string;
  sublocality?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  extraDescription?: string;
  countryCode?: string;
}

export default interface Location {
  address: Address;
  name: string;
  mainPhone?: any;
  id: string;
}
