import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';
import { SillyIdsService } from '../../../../shared/services/silly-ids.service';
import { StringHelperService } from '../../../../shared/services/string-helper.service';
import { GeneratorComponent } from '../generator-component';

@Component({
  selector: 'app-silly-ids',
  templateUrl: './silly-ids.component.html',
  styleUrls: [ './silly-ids.component.scss' ]
})
export class SillyIdsComponent extends GeneratorComponent {
  @ViewChild('sillyIdsCard', { read: ElementRef })
  sillyIdsCard: ElementRef;

  @ViewChild('sillyIdsNameWrapper')
  sillyIdsNameWrapper: ElementRef;

  @HostListener('document:click', [ '$event' ])
  onClick(e: MouseEvent) {
    if (e.target === this.sillyIdsCard.nativeElement || e.target === this.sillyIdsNameWrapper.nativeElement) {
      this.generate();
    }
  }

  constructor(
    readonly generatorService: SillyIdsService,
    readonly stringHelperService: StringHelperService,
    readonly clipboardService: ClipboardService,
    readonly snackBarService: MatSnackBar
  ) {
    super(generatorService, stringHelperService, clipboardService, snackBarService);
  }
}
