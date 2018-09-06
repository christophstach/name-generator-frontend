import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, take } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  emailVerified$: Observable<boolean>;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly afFirestore: AngularFirestore
  ) {
    this.emailVerified$ = this.afAuth.user.pipe(
      map(user => user ? user.emailVerified : true)
    );
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afFirestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  signUp(email, password): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((userCredentials) => from(userCredentials.user.sendEmailVerification()).pipe(
        mapTo(userCredentials))
      )
    );
  }

  signIn(email, password): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  signOut(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }

  updateProfile(userData: Partial<User>): Observable<void> {
    return this.afAuth.user.pipe(
      take(1),
      switchMap(user => from(this.afFirestore.doc<User>(`users/${user.uid}`).update(userData)))
    );
  }

  canRead() {

  }

  canUpdate() {

  }

  canDelete() {

  }
}
