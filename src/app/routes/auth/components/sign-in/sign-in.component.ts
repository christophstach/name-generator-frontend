import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBarService: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onReset(e: Event) {
    e.preventDefault();
    this.signInForm.reset();
  }

  async onSignIn() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;

      try {
        const user = await this.authService.signIn({ email, password }).toPromise();
        await this.router.navigateByUrl('');

        this.snackBarService.open(`Welcome back, ${user.displayName}`, null, { duration: 2500 });
      } catch (e) {
        this.snackBarService.open(e, null, { duration: 2500 });
      }
    }
  }
}
