import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users$: Observable<User[]>;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly afFirestore: AngularFirestore) {

    this.users$ = this.afFirestore.collection<User>('users').valueChanges();
  }
}
