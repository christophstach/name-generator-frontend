import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly afAuth: AngularFireAuth,
    private readonly snackBarService: MatSnackBar,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  onReset(e: Event) {
    e.preventDefault();
    this.signUpForm.reset();
  }

  async onSignUp() {
    if (this.signUpForm.valid) {
      const { email, password, repeatPassword } = this.signUpForm.value;

      if (password === repeatPassword) {
        try {
          const userCredential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
          await userCredential.user.sendEmailVerification();
          await this.router.navigateByUrl('');

          this.snackBarService.open(`User ${userCredential.user.email} successfully signed up`, null, { duration: 2500 });
        } catch (e) {
          this.snackBarService.open(e, null, { duration: 2500 });
        }
      }
    }
  }
}
