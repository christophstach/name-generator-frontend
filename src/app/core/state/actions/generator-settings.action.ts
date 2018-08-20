import { Action } from '@ngrx/store';
import { GeneratorSettingsInterface } from '../../../shared/interfaces/generator-settings.interface';

export enum GenratorSettingsActionTypes {
  SET = '[GeneratorSettings] Set'
}

export class Set implements Action {
  readonly type = GenratorSettingsActionTypes.SET;

  constructor(public payload: GeneratorSettingsInterface) {
  }
}

export type GeneratorSettingsUnion = Set;
