import { Component, ElementRef, HostListener } from '@angular/core';
import { StringHelperService } from '../../../../shared/services/string-helper.service';
import { MatSnackBar } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';
import * as adjectives from 'adjectives';
import * as nouns from 'noun-json';
import * as SillyId from 'sillyid';
import * as CatNames from 'cat-names';
import * as DragonNames from 'dragon-names';
import * as DogNames from 'dog-names';


export enum GenerationMethod {
  CUSTOM = 'CUSTOM',
  SILLY_ID = 'SILLY_ID',
  DRAGON_NAMES = 'DRAGON_NAMES',
  CAT_NAMES = 'CAT_NAMES',
  DOG_NAMES = 'DOG_NAMES'
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: [ './landing-page.component.scss' ]
})
export class LandingPageComponent {
  adjectives: string[] = adjectives;
  nouns: string[] = nouns;

  randomProjectName: string[] = [];
  separator = '-';


  method: GenerationMethod = GenerationMethod.SILLY_ID;
  sillyId = new SillyId(null, '-', false);


  constructor(
    private readonly stringHelperService: StringHelperService,
    private readonly clipboardService: ClipboardService,
    private readonly snackBarService: MatSnackBar,
    private readonly elementRef: ElementRef
  ) {
    this.generate();
  }

  @HostListener('document:keypress', [ '$event' ])
  onKeyPress(e: KeyboardEvent) {
    e.preventDefault();

    if (e.keyCode === 13) {
      this.generate();
    }
  }

  @HostListener('document:click', [ '$event' ])
  onClick(e: MouseEvent) {
    if (e.target === this.elementRef.nativeElement) {
      this.generate();
    }
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private generate() {
    switch (this.method) {
      case GenerationMethod.CUSTOM:
        this.randomProjectName = this.getCustom();
        break;
      case GenerationMethod.SILLY_ID:
        this.randomProjectName = this.getSillyId();
        break;
      case GenerationMethod.CAT_NAMES:
        this.randomProjectName = this.getCatName();
        break;
      case GenerationMethod.DRAGON_NAMES:
        this.randomProjectName = this.getDragonName();
        break;
      case GenerationMethod.DOG_NAMES:
        this.randomProjectName = this.getDogName();
        break;
    }

    const displayString = this.randomProjectName.join(this.separator);

    this.clipboardService.copyFromContent(displayString);
    this.snackBarService.open(`${displayString} was copied to clipboard`);
  }

  ///////////////////////////////

  private getCustom(): string[] {
    const adjective = this.adjectives[ this.random(0, this.adjectives.length - 1) ];
    const noun = this.nouns[ this.random(0, this.nouns.length - 1) ];

    return [ ...adjective.split('-'), ...noun.split('-') ];
  }

  private getSillyId(): string[] {
    const sillyIdString: string = this.sillyId.generate();

    return sillyIdString.split('-');
  }

  private getCatName(): string[] {
    const name = CatNames.random()
      .replace(',', '')
      .replace('/', ' ')
      .replace('-', ' ')
      .toLowerCase();

    return this.stringHelperService.removeDiacritics(name).split(' ');
  }

  private getDragonName(): string[] {
    const name = DragonNames.allRandom()
      .replace(',', '')
      .replace('/', ' ')
      .replace('-', ' ')
      .toLowerCase();

    return this.stringHelperService.removeDiacritics(name).split(' ');
  }

  private getDogName(): string[] {
    const name = DogNames.allRandom()
      .replace(',', '')
      .replace('/', ' ')
      .replace('-', ' ')
      .toLowerCase();

    return this.stringHelperService.removeDiacritics(name).split(' ');
  }


  ////////////////////////////////////////////////////////////////////

  setMethodCustom() {
    this.method = GenerationMethod.CUSTOM;
  }

  setMethodSillyId() {
    this.method = GenerationMethod.SILLY_ID;
  }

  setMethodCatNames() {
    this.method = GenerationMethod.CAT_NAMES;
  }

  setMethodDragonNames() {
    this.method = GenerationMethod.DRAGON_NAMES;
  }

  setMethodDogNames() {
    this.method = GenerationMethod.DOG_NAMES;
  }

  ////////////////////////////////////////////////////////////////////


  isMethodCustom(): boolean {
    return this.method === GenerationMethod.CUSTOM;
  }

  isMethodSillyId(): boolean {
    return this.method === GenerationMethod.SILLY_ID;
  }

  isMethodCatNames(): boolean {
    return this.method === GenerationMethod.CAT_NAMES;
  }

  isMethodDragonNames(): boolean {
    return this.method === GenerationMethod.DRAGON_NAMES;
  }

  isMethodDogNames(): boolean {
    return this.method === GenerationMethod.DOG_NAMES;
  }
}
