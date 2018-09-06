import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Subscription } from 'rxjs';
import { User } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly snackBarService: MatSnackBar,
    private readonly authService: AuthService
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.subscriptions.push(
      this.authService.user$.subscribe((user: User) => {
        const { displayName, firstName, lastName } = user;

        this.profileForm.patchValue({
          displayName,
          firstName,
          lastName
        });
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  createForm() {
    this.profileForm = this.fb.group({
      displayName: [''],
      firstName: [''],
      lastName: ['']
    });
  }

  onReset(e: Event) {
    e.preventDefault();
    this.profileForm.reset();
  }

  async onSave() {
    if (this.profileForm.valid) {
      const { displayName, firstName, lastName } = this.profileForm.value as User;

      try {
        await this.authService.updateProfile({ displayName, firstName, lastName }).toPromise();
        this.snackBarService.open(`Profile saved`, null, { duration: 2500 });
      } catch (e) {
        this.snackBarService.open(e, null, { duration: 2500 });
      }
    }
  }
}
