import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { Root } from '../../../../core/state/reducers';
import { ClipboardService } from '../../../../shared/services/clipboard.service';
import { SillyIdsService } from '../../../../shared/services/silly-ids.service';
import { StringHelperService } from '../../../../shared/services/string-helper.service';
import { GeneratorComponent } from '../generator-component';

@Component({
  selector: 'app-silly-ids',
  templateUrl: './silly-ids.component.html',
  styleUrls: ['./silly-ids.component.scss']
})
export class SillyIdsComponent extends GeneratorComponent {
  @ViewChild('sillyIdsCard', { read: ElementRef })
  sillyIdsCard: ElementRef;

  @ViewChild('sillyIdsNameWrapper')
  sillyIdsNameWrapper: ElementRef;

  constructor(
    generatorService: SillyIdsService,
    stringHelperService: StringHelperService,
    snackBarService: MatSnackBar,
    store: Store<Root>,
    clipboardService: ClipboardService
  ) {
    super(generatorService, stringHelperService, snackBarService, store, clipboardService);
  }

  @HostListener('document:click', ['$event'])
  onClick(e: MouseEvent) {
    if (e.target === this.sillyIdsCard.nativeElement || e.target === this.sillyIdsNameWrapper.nativeElement) {
      this.generate();
    }
  }
}
