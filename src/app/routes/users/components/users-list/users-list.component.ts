import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth.service';
import { UsersService } from '../../../../shared/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>;
  user$: Observable<User>;

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {
    this.users$ = this.usersService.users$;
  }

  ngOnInit() {
  }

}
