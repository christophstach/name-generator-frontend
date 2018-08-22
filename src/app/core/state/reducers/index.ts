import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { GeneratorSettingsInterface } from '../../../shared/interfaces/generator-settings.interface';
import { generatorSettingsReducer } from './generator-settings.reducer';

export interface Root {
  generatorSettings: GeneratorSettingsInterface;
}

export const reducers: ActionReducerMap<Root> = {
  generatorSettings: generatorSettingsReducer
};


export const metaReducers: MetaReducer<Root>[] = !environment.production ? [] : [];
