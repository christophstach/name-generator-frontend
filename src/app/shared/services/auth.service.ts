import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { from, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly afAuth: AngularFireAuth) {
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

  canRead() {

  }

  canUpdate() {

  }

  canDelete() {

  }
}
