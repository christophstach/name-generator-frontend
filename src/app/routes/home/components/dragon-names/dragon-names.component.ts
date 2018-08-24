import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { Root } from '../../../../core/state/reducers';
import { ClipboardService } from '../../../../shared/services/clipboard.service';
import { DragonNamesService } from '../../../../shared/services/dragon-names.service';
import { StringHelperService } from '../../../../shared/services/string-helper.service';
import { GeneratorComponent } from '../generator-component';

@Component({
  selector: 'app-dragon-names',
  templateUrl: './dragon-names.component.html',
  styleUrls: ['./dragon-names.component.scss']
})
export class DragonNamesComponent extends GeneratorComponent {
  @ViewChild('dragonNamesCard', { read: ElementRef })
  dragonNamesCard: ElementRef;

  @ViewChild('dragonNamesNameWrapper')
  dragonNamesNameWrapper: ElementRef;

  @HostListener('document:click', ['$event'])
  onClick(e: MouseEvent) {
    if (e.target === this.dragonNamesCard.nativeElement || e.target === this.dragonNamesNameWrapper.nativeElement) {
      this.generate();
    }
  }

  constructor(
    readonly generatorService: DragonNamesService,
    readonly stringHelperService: StringHelperService,
    readonly snackBarService: MatSnackBar,
    readonly store: Store<Root>,
    readonly clipboardService: ClipboardService
  ) {
    super(generatorService, stringHelperService, snackBarService, store, clipboardService);
  }
}
