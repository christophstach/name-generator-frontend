import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Subscription } from 'rxjs';

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
    private readonly afAuth: AngularFireAuth,
    private readonly snackBarService: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.subscriptions.push(
      this.afAuth.user.subscribe((user: User) => {
        const { displayName } = user;

        this.profileForm.patchValue({
          displayName
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
      photoURL: ['']
    });
  }

  onReset(e: Event) {
    e.preventDefault();
    this.profileForm.reset();
  }

  async onSave() {
    if (this.profileForm.valid) {
      const { displayName, photoURL } = this.profileForm.value;

      try {
        await this.afAuth.auth.currentUser.updateProfile({
          displayName,
          photoURL
        });

        this.snackBarService.open(`Profile saved`, null, { duration: 2500 });
      } catch (e) {
        this.snackBarService.open(e, null, { duration: 2500 });
      }
    }
  }
}
