import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material';
import { range, sample, shuffle } from 'lodash';
import { Observable } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { UserProfile } from '../../../../shared/models/user-profile';
import { AuthService } from '../../../../shared/services/auth.service';
import { GeneratorSettingsDialogComponent } from '../generator-settings-dialog/generator-settings-dialog.component';

@Component({
  selector: 'app-ng-material-layout',
  templateUrl: './ng-material-layout.component.html',
  styleUrls: ['./ng-material-layout.component.scss']
})
export class NgMaterialLayoutComponent {
  @HostBinding('class.small-layout') smallLayout = true;
  @HostBinding('class.large-layout') largeLayout = false;
  @HostBinding('class.email-not-verified') emailNotVerified = false;

  user$: Observable<UserProfile>;
  emailVerified$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe(result => result.matches && this.activateSmallLayout());
    this.breakpointObserver.observe(Breakpoints.Small).subscribe(result => result.matches && this.activateLargeLayout());
    this.breakpointObserver.observe(Breakpoints.Medium).subscribe(result => result.matches && this.activateLargeLayout());
    this.breakpointObserver.observe(Breakpoints.Large).subscribe(result => result.matches && this.activateLargeLayout());
    this.breakpointObserver.observe(Breakpoints.XLarge).subscribe(result => result.matches && this.activateLargeLayout());

    this.emailVerified$ = this.authService.emailVerified$.pipe(
      startWith(true),
      tap((emailVerified) => this.emailNotVerified = !emailVerified)
    );

    this.user$ = this.authService.user$;
  }

  activateSmallLayout() {
    this.smallLayout = true;
    this.largeLayout = false;
  }

  activateLargeLayout() {
    this.smallLayout = false;
    this.largeLayout = true;
  }

  onSettingsClick(e: Event) {
    this.dialog.open(GeneratorSettingsDialogComponent);
  }
}
