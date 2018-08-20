import { Injectable } from '@angular/core';
import * as DragonNames from 'dragon-names';
import { GeneratorServiceInterface } from '../interfaces/generator-service.interface';

@Injectable({
  providedIn: 'root'
})
export class DragonNamesService implements GeneratorServiceInterface {
  private dragonNames = DragonNames;

  constructor() {
  }

  random(): string {
    return this.dragonNames.allRandom();
  }
}
