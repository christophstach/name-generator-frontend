import { Injectable } from '@angular/core';
import * as SillyId from 'sillyid';
import { GeneratorServiceInterface } from '../interfaces/generator-service.interface';

@Injectable({
  providedIn: 'root'
})
export class SillyIdsService implements GeneratorServiceInterface {
  private sillyId = new SillyId(null, ' ', true);

  constructor() {
  }

  random(): string {
    return this.sillyId.generate();
  }
}
