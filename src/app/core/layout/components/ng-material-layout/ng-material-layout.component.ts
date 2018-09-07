import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostBinding, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { range, sample, shuffle } from 'lodash';
import { EMPTY, from, interval, Observable, Subscription } from 'rxjs';
import { map, repeat, startWith, tap, zip } from 'rxjs/operators';
import { User } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth.service';
import { GeneratorSettingsDialogComponent } from '../generator-settings-dialog/generator-settings-dialog.component';

@Component({
  selector: 'app-ng-material-layout',
  templateUrl: './ng-material-layout.component.html',
  styleUrls: ['./ng-material-layout.component.scss'],
  animations: [
    trigger('fadingImageOne', [
      state('one', style({ opacity: 1 })),
      state('two', style({ opacity: 0 })),
      transition('one <=> two', animate('2000ms ease-in')),
    ]),
    trigger('fadingImageTwo', [
      state('one', style({ opacity: 0 })),
      state('two', style({ opacity: 1 })),
      transition('one <=> two', animate('2000ms ease-in')),
      transition('void => two', animate('2000ms ease-in')),
    ])
  ]
})
export class NgMaterialLayoutComponent implements OnInit {
  @HostBinding('class.small-layout') smallLayout = true;
  @HostBinding('class.large-layout') largeLayout = false;
  @HostBinding('class.email-not-verified') emailNotVerified = false;

  user$: Observable<User>;
  emailVerified$: Observable<boolean>;
  changingImages$: Observable<any>;
  changingImagesSubscription: Subscription;

  @ViewChild('fadingImageOne')
  fadingImageOne: ElementRef;

  @ViewChild('fadingImageTwo')
  fadingImageTwo: ElementRef;

  fadingImageState: 'one' | 'two' = 'one';

  readonly numImages = 10;
  readonly slideShowImages: string[];

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly dialog: MatDialog,
    private readonly renderer: Renderer2,
    private readonly authService: AuthService,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe(result => result.matches && this.activateSmallLayout());
    this.breakpointObserver.observe(Breakpoints.Small).subscribe(result => result.matches && this.activateLargeLayout());
    this.breakpointObserver.observe(Breakpoints.Medium).subscribe(result => result.matches && this.activateLargeLayout());
    this.breakpointObserver.observe(Breakpoints.Large).subscribe(result => result.matches && this.activateLargeLayout());
    this.breakpointObserver.observe(Breakpoints.XLarge).subscribe(result => result.matches && this.activateLargeLayout());

    this.slideShowImages = shuffle(
      range(1, this.numImages + 1).map(num => `../../../../../assets/backgrounds/${num}.jpg`)
    );

    if (isPlatformBrowser(platformId)) {
      // Preload images
      const images = [];
      this.slideShowImages.forEach(slideShowImage => {
        const image = new Image();
        image.src = slideShowImage;
        images.push(image);
      });

      this.changingImages$ = interval(30000).pipe(
        zip(
          from(this.slideShowImages).pipe(
            repeat()
          )
        ),
        map(values => `url('${values[1]}')`)
      );
    } else {
      this.changingImages$ = EMPTY;
    }

    this.emailVerified$ = this.authService.emailVerified$.pipe(
      startWith(true),
      tap((emailVerified) => this.emailNotVerified = !emailVerified)
    );
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    this.renderer.setStyle(this.fadingImageOne.nativeElement, 'background-image', `url('${sample(this.slideShowImages)}')`);
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (!this.changingImagesSubscription) {
      this.changingImagesSubscription = this.changingImages$.subscribe(image => {
        if (this.fadingImageState === 'one') {
          this.fadingImageState = 'two';
          this.renderer.setStyle(this.fadingImageTwo.nativeElement, 'background-image', image);
        } else if (this.fadingImageState === 'two') {
          this.fadingImageState = 'one';
          this.renderer.setStyle(this.fadingImageOne.nativeElement, 'background-image', image);
        }
      });
    }
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
