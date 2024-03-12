interface id {
  id: number;
}

interface subcategory {
  name: string;
  id?: number;
}

interface Location {
  address: string;
  latitude: string;
  longtitude: string;
  place_id: string;
}

export interface ProductDataObject {
  id?: number;
  locations: Location[];
  name: string;
  subsidiary: id;
  //   image?: unknown;
  description: string;
  marketing?: string;
  category?: id;
  subCategories?: Array<id> | null;
  memberships?: Array<id> | null;
  availabilityFrom?: string;
  availabilityTo?: string;
  visibility: boolean;
  vendor?: {
    vendorId: number;
  };
}

export interface CategoryDataObject {
  id?: number;
  name: string;
  color: number;
  subCategories?: subcategory[];
}
