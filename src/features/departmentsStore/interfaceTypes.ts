interface Subsidiary {
  id: number | undefined;
  name: string | undefined;
}

interface Permission {
  id: number;
  name: string;
  field: string;
  checked: boolean;
}

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Array<Permission>;
  creationTime: string;
  modificationTime: string;
}

export interface DepartmentsItemData {
  id: number;
  description: string;
  features?: string;
  name: string;
  subsidiary: Subsidiary;
  roles?: Array<Role>;
  creationTime?: string;
  modificationTime?: string;
}

export interface addDepartmentData {
  id?: number;
  name?: string;
  description: string;
  subsidiary: Subsidiary;
}
