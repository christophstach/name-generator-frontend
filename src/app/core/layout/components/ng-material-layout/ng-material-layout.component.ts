import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { range, shuffle } from 'lodash';
import { from, interval, Observable } from 'rxjs';
import { map, repeat, startWith, zip } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface NavItem {
  text: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-ng-material-layout',
  templateUrl: './ng-material-layout.component.html',
  styleUrls: [ './ng-material-layout.component.scss' ],
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
  $changingImages$: Observable<any>;

  @ViewChild('fadingImageOne')
  fadingImageOne: ElementRef;

  @ViewChild('fadingImageTwo')
  fadingImageTwo: ElementRef;

  fadingImageState: 'one' | 'two' = 'one';

  readonly numImages = 17;
  readonly slideShowImages: string[];
  readonly navItems: NavItem[] = [
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
    this.slideShowImages = shuffle(
      range(1, this.numImages + 1)
        .map(num => `../../../../../assets/backgrounds/${num}.jpg`)
    );

    this.$changingImages$ = interval(30000).pipe(
      startWith(1),
      zip(
        from(this.slideShowImages).pipe(
          repeat()
        )
      ),
      map(values => [ values[ 0 ] % 2, `url('${values[ 1 ]}')` ])
    );
  }

  ngOnInit() {
    this.$changingImages$.subscribe(image => {
      if (image[ 0 ] === 0) {
        this.fadingImageOne.nativeElement.style.backgroundImage = image[ 1 ];
        this.fadingImageState = 'one';
      } else if (image[ 0 ] === 1) {
        this.fadingImageTwo.nativeElement.style.backgroundImage = image[ 1 ];
        this.fadingImageState = 'two';
      }
    });
  }
}
