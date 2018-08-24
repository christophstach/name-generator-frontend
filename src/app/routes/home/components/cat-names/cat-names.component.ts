import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { Root } from '../../../../core/state/reducers';
import { CatNamesService } from '../../../../shared/services/cat-names.service';
import { ClipboardService } from '../../../../shared/services/clipboard.service';
import { StringHelperService } from '../../../../shared/services/string-helper.service';
import { GeneratorComponent } from '../generator-component';

@Component({
  selector: 'app-cat-names',
  templateUrl: './cat-names.component.html',
  styleUrls: ['./cat-names.component.scss']
})
export class CatNamesComponent extends GeneratorComponent {
  @ViewChild('catNamesCard', { read: ElementRef })
  catNamesCard: ElementRef;

  @ViewChild('catNamesNameWrapper')
  catNamesNameWrapper: ElementRef;

  @HostListener('document:click', ['$event'])
  onClick(e: MouseEvent) {
    if (e.target === this.catNamesCard.nativeElement || e.target === this.catNamesNameWrapper.nativeElement) {
      this.generate();
    }
  }

  constructor(
    readonly generatorService: CatNamesService,
    readonly stringHelperService: StringHelperService,
    readonly snackBarService: MatSnackBar,
    readonly store: Store<Root>,
    readonly clipboardService: ClipboardService
  ) {
    super(generatorService, stringHelperService, snackBarService, store, clipboardService);
  }
}
