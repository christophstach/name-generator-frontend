import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { ClipboardService } from 'ngx-clipboard';
import { Root } from '../../../../core/state/reducers';
import { DogNamesService } from '../../../../shared/services/dog-names.service';
import { StringHelperService } from '../../../../shared/services/string-helper.service';
import { GeneratorComponent } from '../generator-component';

@Component({
  selector: 'app-dog-names',
  templateUrl: './dog-names.component.html',
  styleUrls: [ './dog-names.component.scss' ]
})
export class DogNamesComponent extends GeneratorComponent {
  @ViewChild('dogNamesCard', { read: ElementRef })
  dogNamesCard: ElementRef;

  @ViewChild('dogNamesNameWrapper')
  dogNamesNameWrapper: ElementRef;

  @HostListener('document:click', [ '$event' ])
  onClick(e: MouseEvent) {
    if (e.target === this.dogNamesCard.nativeElement || e.target === this.dogNamesNameWrapper.nativeElement) {
      this.generate();
    }
  }

  constructor(
    readonly generatorService: DogNamesService,
    readonly stringHelperService: StringHelperService,
    readonly clipboardService: ClipboardService,
    readonly snackBarService: MatSnackBar,
    readonly store: Store<Root>
  ) {
    super(generatorService, stringHelperService, clipboardService, snackBarService, store);
  }
}
