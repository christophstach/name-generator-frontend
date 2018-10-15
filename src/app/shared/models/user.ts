import { UserProfile } from './user-profile';

export interface User extends UserProfile {
  password?: string;
}
