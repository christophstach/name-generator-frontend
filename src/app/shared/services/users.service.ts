import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userProfiles: Observable<UserProfile[]>;

  private userProfilesCollection: AngularFirestoreCollection<UserProfile>;

  constructor(
    private afAuth: AngularFireAuth,
    private  afFirestore: AngularFirestore) {
    this.userProfilesCollection = this.afFirestore.collection<UserProfile>('users');
    this.userProfiles = this.userProfilesCollection.valueChanges();
  }

  create(userProfile: Partial<UserProfile>) {
    const { email, displayName, firstName, lastName, roles, owner } = userProfile;
    return this.userProfilesCollection.add({ email, displayName, firstName, lastName, roles, owner });
  }

  update(id: string, userProfile: Partial<UserProfile>) {

  }

  delete(id: string) {

  }
}
