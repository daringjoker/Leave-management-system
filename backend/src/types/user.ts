export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
  isTemporaryPassword: boolean;
  country: string;
  countryCode: string;
  countryId: number;
  department: string;
  departmentId: number;
  name: string;
  address: string;
  phone: string;
  roleId: number;
  designation: string;
  managerId: number;
  managerName: string;
  managerAddress: string;
  managerDesignation: string;
}
