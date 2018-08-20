import { Injectable } from '@angular/core';
import * as CatNames from 'cat-names';
import { GeneratorServiceInterface } from '../interfaces/generator-service.interface';

@Injectable({
  providedIn: 'root'
})
export class CatNamesService implements GeneratorServiceInterface {
  private catNames = CatNames;

  constructor() {
  }

  random(): string {
    return this.catNames.random();
  }
}
