import { Component } from '@angular/core';

interface NavItem {
  text: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-ng-material-layout',
  templateUrl: './ng-material-layout.component.html',
  styleUrls: [ './ng-material-layout.component.scss' ]
})
export class NgMaterialLayoutComponent {
  navItems: NavItem[] = [
    {
      text: 'Home',
      route: '/',
      icon: 'home'
    },
    {
      text: 'Profile',
      route: '/profile',
      icon: 'account_circle',
    },
    {
      text: 'Logout',
      route: '/logout'
    },
    {
      text: 'Login',
      route: '/login'
    },
    {
      text: 'Users',
      route: '/users'
    }
  ];

  constructor() {
  }


}
