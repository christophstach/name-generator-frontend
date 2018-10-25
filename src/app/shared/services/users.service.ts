import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userProfiles: Observable<UserProfile[]>;

  constructor() {
    this.userProfiles = EMPTY;
  }

  create(userProfile: Partial<UserProfile>) {
    const { email, displayName, firstName, lastName, roles, owner } = userProfile;
    return EMPTY;
  }

  update(id: string, userProfile: Partial<UserProfile>) {

  }

  delete(id: string) {

  }
}
