import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding } from '@angular/core';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: [ './landing-page.component.scss' ]
})
export class LandingPageComponent {
  @HostBinding('class.small-layout') smallLayout = false;
  @HostBinding('class.large-layout') largeLayout = false;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(Breakpoints.XSmall).subscribe(result => result.matches && this.activateSmallLayout());
    breakpointObserver.observe(Breakpoints.Small).subscribe(result => result.matches && this.activateLargeLayout());
    breakpointObserver.observe(Breakpoints.Medium).subscribe(result => result.matches && this.activateLargeLayout());
    breakpointObserver.observe(Breakpoints.Large).subscribe(result => result.matches && this.activateLargeLayout());
    breakpointObserver.observe(Breakpoints.XLarge).subscribe(result => result.matches && this.activateLargeLayout());
  }

  activateSmallLayout() {
    this.smallLayout = true;
    this.largeLayout = false;
  }

  activateLargeLayout() {
    this.smallLayout = false;
    this.largeLayout = true;
  }
}
