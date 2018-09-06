import { Roles } from './roles';

export interface User {
  id: string;
  roles?: Roles;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
}
