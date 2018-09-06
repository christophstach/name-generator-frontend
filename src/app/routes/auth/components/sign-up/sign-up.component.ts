import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
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
      repeatPassword: ['', Validators.required],
      displayName: ['', Validators.required],
      firstName: [''],
      lastName: [''],
    });
  }

  onReset(e: Event) {
    e.preventDefault();
    this.signUpForm.reset();
  }

  async onSignUp() {
    if (this.signUpForm.valid) {
      const { email, password, repeatPassword, displayName, firstName, lastName } = this.signUpForm.value;

      if (password === repeatPassword) {
        try {
          const user = await this.authService.signUp(email, password, displayName, firstName, lastName).toPromise();
          await this.router.navigateByUrl('');

          this.snackBarService.open(`User ${user.displayName} successfully signed up`, null, { duration: 2500 });
        } catch (e) {
          this.snackBarService.open(e, null, { duration: 2500 });
        }
      }
    }
  }
}
