import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../../shared/models/user-profile';
import { AuthService } from '../../../../shared/services/auth.service';
import { UsersService } from '../../../../shared/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$: Observable<UserProfile[]>;
  user$: Observable<UserProfile>;

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {
    this.users$ = this.usersService.userProfiles;
  }

  ngOnInit() {
  }

}
