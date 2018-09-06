import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() {
  }


  find(filter: Partial<User> = {}): Observable<User[]> {
    return of([
      {
        id: '1',
        email: 'christoph.stach@gmail.com',
        firstName: 'Christoph',
        lastName: 'Stach',
        displayName: 'Christoph Stach'
      },
      {
        id: '2',
        email: 'adriansaiz@gmail.com',
        firstName: 'Adrian',
        lastName: 'Ferri',
        displayName: 'Adrian Saiz Ferri'
      }
    ] as User[]);
  }
}
