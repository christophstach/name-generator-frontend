import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, take } from 'rxjs/operators';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<UserProfile>;
  emailVerified$: Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore
  ) {
    this.emailVerified$ = this.afAuth.user.pipe(
      map(user => user ? user.emailVerified : true)
    );
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afFirestore.doc<UserProfile>(`user-profile/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  signUp({ email, password, displayName, firstName, lastName }: User): Observable<UserProfile> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((userCredentials) => from(userCredentials.user.sendEmailVerification()).pipe(
        mapTo(userCredentials))
      ),
      switchMap((userCredentials) => {
        const owner = userCredentials.user.uid;

        return this.afFirestore.collection<UserProfile>('user-profiles').add({
          owner,
          email,
          displayName,
          firstName,
          lastName
        });
      }),
      switchMap(() => this.user$.pipe(take(1)))
    );
  }

  signIn({ email, password }: Credentials): Observable<UserProfile> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(() => this.user$.pipe(take(1)))
    );
  }

  signOut(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }

  updateProfile(userProfile: Partial<UserProfile>): Observable<void> {
    return this.afAuth.user.pipe(
      take(1),
      switchMap(user => from(this.afFirestore.doc<UserProfile>(`user-profiles/${user.uid}`).update(userProfile)))
    );
  }

  canRead() {

  }

  canUpdate() {

  }

  canDelete() {

  }
}
