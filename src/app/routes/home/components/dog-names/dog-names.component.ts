import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { Root } from '../../../../core/state/reducers';
import { ClipboardService } from '../../../../shared/services/clipboard.service';
import { DogNamesService } from '../../../../shared/services/dog-names.service';
import { StringHelperService } from '../../../../shared/services/string-helper.service';
import { GeneratorComponent } from '../generator-component';

@Component({
  selector: 'app-dog-names',
  templateUrl: './dog-names.component.html',
  styleUrls: ['./dog-names.component.scss']
})
export class DogNamesComponent extends GeneratorComponent {
  @ViewChild('dogNamesCard', { read: ElementRef })
  dogNamesCard: ElementRef;

  @ViewChild('dogNamesNameWrapper')
  dogNamesNameWrapper: ElementRef;

  constructor(
    generatorService: DogNamesService,
    stringHelperService: StringHelperService,
    snackBarService: MatSnackBar,
    store: Store<Root>,
    clipboardService: ClipboardService
  ) {
    super(generatorService, stringHelperService, snackBarService, store, clipboardService);
  }

  @HostListener('document:click', ['$event'])
  onClick(e: MouseEvent) {
    if (e.target === this.dogNamesCard.nativeElement || e.target === this.dogNamesNameWrapper.nativeElement) {
      this.generate();
    }
  }
}
