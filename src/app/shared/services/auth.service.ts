import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<UserProfile>;
  emailVerified$: Observable<boolean>;

  constructor() {
    this.user$ = EMPTY;
    this.emailVerified$ = EMPTY;
  }

  signUp({ email, password, displayName, firstName, lastName }: User): Observable<UserProfile> {
    return EMPTY;
  }

  signIn({ email, password }: Credentials): Observable<UserProfile> {
    return EMPTY;
  }

  signOut(): Observable<void> {
    return EMPTY;
  }

  updateProfile(userProfile: Partial<UserProfile>): Observable<void> {
    return EMPTY;
  }

  canRead() {

  }

  canUpdate() {

  }

  canDelete() {

  }
}
