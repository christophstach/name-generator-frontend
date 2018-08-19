import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './routes/home/home.module#HomeModule'
  },
  /*
  {
    path: 'auth',
    loadChildren: './routes/auth/auth.module#AuthModule'
  },
  {
    path: 'users',
    loadChildren: './routes/users/users.module#UsersModule'
  }
  */
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
