import { Roles } from './roles';

export interface UserProfile {
  owner?: string;
  roles?: Roles;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
}
