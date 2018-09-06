import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersListComponent } from './components/users-list/users-list.component';

import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UsersListComponent, UserDetailComponent]
})
export class UsersModule {
}
