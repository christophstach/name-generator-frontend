import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly router: Router
  ) {
  }

  async ngOnInit() {
    await this.afAuth.auth.signOut();
    await this.router.navigateByUrl('');
  }
}
