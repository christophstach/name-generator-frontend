import { Component, HostListener } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import * as adjectives from 'adjectives';
import * as nouns from 'noun-json';
import * as SillyId from 'sillyid';


export enum GenerationMethod {
  OWN = 'own',
  SILLY_ID = 'sillyId'
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


  constructor(private readonly clipboardService: ClipboardService) {
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
    this.generate();
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private generate() {
    switch (this.method) {
      case GenerationMethod.OWN:
        this.randomProjectName = this.generateOwn();
        break;
      case GenerationMethod.SILLY_ID:
        this.randomProjectName = this.generateSillyId();
        break;
    }


    this.clipboardService.copyFromContent(this.randomProjectName.join(this.separator));
  }

  private generateOwn(): string[] {
    const adjective = this.adjectives[ this.random(0, this.adjectives.length - 1) ];
    const noun = this.nouns[ this.random(0, this.nouns.length - 1) ];

    return [ ...adjective.split('-'), ...noun.split('-') ];
  }

  private generateSillyId(): string[] {
    const sillyIdString: string = this.sillyId.generate();

    return sillyIdString.split('-');
  }
}
