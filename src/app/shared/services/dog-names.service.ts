import { Injectable } from '@angular/core';
import * as DogNames from 'dog-names';
import { GeneratorServiceInterface } from '../interfaces/generator-service.interface';

@Injectable({
  providedIn: 'root'
})
export class DogNamesService implements GeneratorServiceInterface {
  private dogNames = DogNames;

  constructor() {
  }

  random(): string {
    return this.dogNames.allRandom();
  }
}
